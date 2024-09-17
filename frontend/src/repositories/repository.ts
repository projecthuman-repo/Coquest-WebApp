import { map, from, Observable } from "rxjs";
import { gql } from "graphql-request";
import {
	replaceNullsWithDefaults,
	replaceUndefinedWithNulls,
	toOutputFormat,
} from "./common";
import graphQLClient from "../apiInterface/client";
import { Model } from "../models/common";

// TODO: Move elsewhere
// Create instance indicated by type parameter
class Factory<T> {
	constructor(private type: { new (data?: any): T }) {}

	create(data?: any): T {
		return new this.type(data);
	}
}

function getFetchQuery(typeName: RepoTypeName): string {
	let ret: string;
	switch (typeName) {
		case "User":
			ret = gql`
				query Query($id: String, $expand: String) {
					findUserbyID(id: $id, expand: $expand) {
						userID
						name {
							first
							middle
							last
						}
						username
						email
						location {
							lat
							lng
						}
						biography
						registered {
							type: __typename
							... on bool {
								boolValue
							}
							... on int {
								numValue
							}
						}
						communities {
							type: __typename
							... on string {
								strValue
							}
							... on regenquestCommunityOutput {
								objValue {
									_id
									name
									description
									objective
									initiative
									tags
									location {
										lat
										lng
									}
									images {
										contentType
										path
									}
									members {
										type: __typename
										... on string {
											strValue
										}
										... on regenquestUserOutput {
											objValue {
												_id
												username
												images {
													contentType
													path
												}
											}
										}
									}
								}
							}
						}
						_id
						motives
						topics
						currentLevel
						images {
							contentType
							path
						}
						skills {
							skillName
							skillLevel
						}
						badges {
							badgeName
							badgeDescription
						}
						recommendations {
							name
							comment
						}
					}
				}
			`;
			break;
		case "Community":
			ret = gql`
				query Query($id: String) {
					findCommunitybyID(id: $id) {
						_id
						name
						description
						objective
						initiative
						tags
						location {
							lat
							lng
						}
						images {
							contentType
							path
						}
						members {
							type: __typename
							... on string {
								strValue
							}
							... on regenquestUserOutput {
								objValue {
									_id
									username
									images {
										contentType
										path
									}
								}
							}
						}
					}
				}
			`;
			break;
	}
	return ret;
}

// TODO: make a registry of all possible Model types
type RepoTypeName = "User" | "Community";

class Repository<T extends Model> {
	private static instances: Map<string, Repository<any>> = new Map();

	private obj: T;
	private typeName: RepoTypeName;
	private factory: Factory<T>;

	private readonly updateMut: string;
	private readonly createMut: string;
	private readonly fetchQuery: string;

	fetch(
		inputObj: T,
		overrideProps?: Partial<T>,
		additionalParams?: any,
	): Observable<T> {
		if (inputObj.isValid()) {
			return from(
				graphQLClient.request(this.fetchQuery, {
					id: inputObj.id,
					...additionalParams,
				}),
			).pipe(
				map((data: any): T => {
					this.obj = this.factory.create(
						data[`find${this.typeName}byID`],
					);
					// Because we fetch all the data,
					// there is no lack of data as defined in this Stackoverflow post: https://stackoverflow.com/questions/1626597/should-functions-return-null-or-an-empty-object
					// Thus, we should remove all `null`s and replace it with some valid data.
					const res: T = replaceNullsWithDefaults(this.obj);
					return res;
				}),
			);
		} else {
			return from(
				graphQLClient.request(this.createMut, {
					[`${this.typeName.toLowerCase()}Input`]:
						toOutputFormat(inputObj),
				}),
			).pipe(
				map((data: any): T => {
					// New objects lack most data, so we must replace unassigned fields with null to
					// match the data in the DB after a successful insert.
					this.obj = this.factory.create(
						replaceUndefinedWithNulls({
							_id: data[`createRegenquest${this.typeName}`]["id"],
							...inputObj,
							...overrideProps,
						}),
					);

					const res: T = replaceNullsWithDefaults(this.obj);
					return res;
				}),
			);
		}
	}

	update(obj: T) {
		// TODO: only update the changed fields
		graphQLClient
			.request(this.updateMut, {
				userInput: toOutputFormat(obj),
			})
			.then((res: any) => {
				console.log(res);
				this.obj = obj;
			})
			.catch((error) => console.error(error));
	}

	constructor(typeName: RepoTypeName, type: new (data?: any) => T) {
		this.typeName = typeName;
		this.factory = new Factory<T>(type);
		this.obj = this.factory.create();

		const lowerTypeName = typeName.toLowerCase();

		this.updateMut = gql`
			mutation UpdateRegenquest${typeName}($${lowerTypeName}Input: regenquest${typeName}Input) {
					updateRegenquest${typeName}(${lowerTypeName}Input: $${lowerTypeName}Input) {
						code
						response
					}
				}
			`;

		this.createMut = gql`
			mutation CreateRegenquest${typeName}($${lowerTypeName}Input: regenquest${typeName}Input) {
				createRegenquest${typeName}(${lowerTypeName}Input: $${lowerTypeName}Input) {
					code
					response
					id
				}
			}
			`;

		this.fetchQuery = getFetchQuery(typeName);
	}

	static getInstance<T extends Model>(
		typeName: RepoTypeName,
		type: new (data?: any) => T,
	): Repository<T> {
		if (!this.instances.has(typeName)) {
			this.instances.set(typeName, new Repository<T>(typeName, type));
		}
		return this.instances.get(typeName) as Repository<T>;
	}
}

export default Repository;
