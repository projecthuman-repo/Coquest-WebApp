import { graphql } from "@/__generated__";

/*
 * To read more, go to ./example/gqlStringsExample.ts
 */

export const topicsQuery = graphql(`
	query GetTopics {
		options: getTopics {
			name
		}
	}
`);

export const motivesQuery = graphql(`
	query GetMotives {
		options: getMotives {
			name
		}
	}
`);

export const CREATE_COOP_MUTATION = graphql(`
	mutation CreateCoop($userInput: CoopInput!) {
		createCoop(userInput: $userInput) {
			code
			id
			response
		}
	}
`);

export const JOIN_COOP_MUTATION = graphql(`
	mutation JoinCoop($userInput: joinCoopInput!) {
		joinCoop(userInput: $userInput) {
			code
			response
		}
	}
`);

export const GET_COOPS = graphql(`
	query GetCoops {
		getCoops {
			_id
			# userID
			name
			type
			summary
			mission
			# locationAllowed
			# notificationAllowed
			startDate
			endDate
			recurring
			# radius
			# haveNeutralMeetingSpace
			# venues
			# additionalInfo
			# budgetingItems {
			# 	name
			# 	quantity
			# 	costEach
			# 	costTotal
			# }
			# openToBartering
			members {
				userID
				username
			}
			# participationCost
			# maxParticipants
			# needsCrowdfunding
			# crowdfundingAmount
			# crowdfundingMessage
			# materialHelp
			# serviceHelp
			# operationHelp
			# promotionImage
			# shareLink
			# invitedUsers
			location {
				name
				lng
				lat
			}
			milestones {
				completed
				description
				title
				dateStarted
				dateCompleted
			}
			volunteerPositions {
				title
				responsibilities
				skills
			}
			# promotionArea {
			# 	lat
			# 	lng
			# }
		}
	}
`);
