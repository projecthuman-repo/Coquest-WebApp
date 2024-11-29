import { graphql } from "@/__generated__";

export const JOIN_PROGRAM_MUTATION = graphql(`
	mutation JoinProgram($userInput: joinProgramInput!) {
		joinProgram(userInput: $userInput) {
			code
			response
		}
	}
`);

export const GET_PROGRAMS = graphql(`
	query GetPrograms {
		getPrograms {
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

export const UPDATE_PROGRAM_MUTATION = graphql(`
	mutation UpdateProgram($userInput: ProgramInput!) {
		updateProgram(userInput: $userInput) {
			code
			id
		}
	}
`);
