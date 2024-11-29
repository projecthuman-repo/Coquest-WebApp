import { graphql } from "@/__generated__";

export const JOIN_PROJECT_MUTATION = graphql(`
	mutation JoinProject($userInput: joinProjectInput!) {
		joinProject(userInput: $userInput) {
			code
			response
		}
	}
`);

export const GET_PROJECTS = graphql(`
	query getProjects {
		getProjects {
			_id
			userID
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
				_id
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

export const UPDATE_PROJECT_MUTATION = graphql(`
	mutation UpdateProject($userInput: ProjectInput!) {
		updateProject(userInput: $userInput) {
			code
			id
		}
	}
`);
