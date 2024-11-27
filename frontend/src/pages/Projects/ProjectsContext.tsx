import React, { createContext, useState } from "react";
import { Project } from "../../models/projectModel";

// TODO fetch post data from backend
const data: Project[] = [
	{
		id: "1",
		name: "Project 1",
		progress: 50,
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
		objective:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
		initiative:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
		time: "every Mon and Wed, 6:00 - 6:30pm",
		date: "Jan 1 - 31, 2023",
		location: "Community center",
		spots: 3,
		cost: 15,
		milestones: [
			{
				_id: "1",
				type: "Milestone",
				title: "Milestone 1",
				progress: 100,
				description:
					"Lorem ipsum dolor sit amet consectetur. Id maecenas tortor porta ultrices faucibus. Sed potenti ac egestas in. Vitae pellentesque arcu ornare eu elit habitant in odio. Quis urna montes risus luctus. Tortor arcu sit condimentum commodo sit sed suscipit vel. Viverra diam nisl tristique mauris diam. Facilisi quam id tincidunt faucibus non gravida nisl vivamus faucibus. Dignissim vitae gravida amet id cursus at. Erat tincidunt amet id lacus nunc suspendisse ac sit auctor. Ut integer eget ut massa mattis quam donec consequat at.",
				completedBy: "John Doe",
				dateStarted: "2023-06-01",
				dateCompleted: "2023-08-22",
			},
			{
				_id: "2",
				type: "Milestone",
				title: "Milestone 2",
				progress: 100,
				description:
					"Lorem ipsum dolor sit amet consectetur. Vitae cum eget dolor vehicula massa porttitor tortor eget. Vitae egestas lorem viverra sit. Arcu placerat suspendisse ac eget sed. Ut etiam ut sit cursus sem.",
				completedBy: "John Doe",
				dateStarted: "2021-08-01",
				dateCompleted: "2021-08-15",
			},
			{
				_id: "3",
				type: "Milestone",
				title: "Milestone 3",
				progress: 20,
				description:
					"Lorem ipsum dolor sit amet consectetur. Vitae cum eget dolor vehicula massa porttitor tortor eget. Vitae egestas lorem viverra sit. Arcu placerat suspendisse ac eget sed. Ut etiam ut sit cursus sem.",
				completedBy: "John Doe",
				dateStarted: "2024-08-01",
				dateCompleted: "2024-08-15",
			},
			{
				_id: "4",
				type: "Milestone",
				title: "Milestone 4",
				progress: 0,
				description:
					"Lorem ipsum dolor sit amet consectetur. Vitae cum eget dolor vehicula massa porttitor tortor eget. Vitae egestas lorem viverra sit. Arcu placerat suspendisse ac eget sed. Ut etiam ut sit cursus sem.",
				completedBy: "John Doe",
				dateStarted: "2024-08-01",
				dateCompleted: "2024-08-15",
			},
		],
		volunteerPositions: [
			{
				id: "1",
				title: "Volunteering Title 1",
				responsibilities:
					"Lorem ipsum dolor sit amet consectetur. Id maecenas tortor porta ultrices faucibus. Sed potenti ac egestas in. Vitae pellentesque arcu ornare eu elit habitant in odio. Quis urna montes risus luctus. Tortor arcu sit condimentum commodo sit sed suscipit vel. Viverra diam nisl tristique mauris diam. Facilisi quam id tincidunt faucibus non gravida nisl vivamus faucibus. Dignissim vitae gravida amet id cursus at. Erat tincidunt amet id lacus nunc suspendisse ac sit auctor. Ut integer eget ut massa mattis quam donec consequat at.",
				skills: ["Skill 1", "Skill 2", "Skill 3"],
			},
			{
				id: "2",
				title: "Volunteering Title 2",
				responsibilities:
					"Lorem ipsum dolor sit amet consectetur. Id maecenas tortor porta ultrices faucibus. Sed potenti ac egestas in. Vitae pellentesque arcu ornare eu elit habitant in odio. Quis urna montes risus luctus. Tortor arcu sit condimentum commodo sit sed suscipit vel. Viverra diam nisl tristique mauris diam. Facilisi quam id tincidunt faucibus non gravida nisl vivamus faucibus. Dignissim vitae gravida amet id cursus at. Erat tincidunt amet id lacus nunc suspendisse ac sit auctor. Ut integer eget ut massa mattis quam donec consequat at.",
				skills: ["Skill 1", "Skill 2", "Skill 3"],
			},
			{
				id: "3",
				title: "Volunteering Title 3",
				responsibilities:
					"Lorem ipsum dolor sit amet consectetur. Id maecenas tortor porta ultrices faucibus. Sed potenti ac egestas in. Vitae pellentesque arcu ornare eu elit habitant in odio. Quis urna montes risus luctus. Tortor arcu sit condimentum commodo sit sed suscipit vel. Viverra diam nisl tristique mauris diam. Facilisi quam id tincidunt faucibus non gravida nisl vivamus faucibus. Dignissim vitae gravida amet id cursus at. Erat tincidunt amet id lacus nunc suspendisse ac sit auctor. Ut integer eget ut massa mattis quam donec consequat at.",
				skills: ["Skill 1", "Skill 2", "Skill 3"],
			},
			{
				id: "4",
				title: "Volunteering Title 4",
				responsibilities:
					"Lorem ipsum dolor sit amet consectetur. Id maecenas tortor porta ultrices faucibus. Sed potenti ac egestas in. Vitae pellentesque arcu ornare eu elit habitant in odio. Quis urna montes risus luctus. Tortor arcu sit condimentum commodo sit sed suscipit vel. Viverra diam nisl tristique mauris diam. Facilisi quam id tincidunt faucibus non gravida nisl vivamus faucibus. Dignissim vitae gravida amet id cursus at. Erat tincidunt amet id lacus nunc suspendisse ac sit auctor. Ut integer eget ut massa mattis quam donec consequat at.",
				skills: ["Skill 1", "Skill 2", "Skill 3"],
			},
		],
		openRoles: [
			{
				id: "1",
				title: "Software Developer",
				project: "Interesting Project",
				location: "Toronto, ON",
				description:
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vehicula finibus placerat. In hac habitasse platea dictumst. Sed iaculis mollis tellus id vulputate. Aliquam nisl ligula, tempor eu ipsum vel, faucibus egestas ipsum. Vestibulum volutpat purus risus, sit amet posuere sem laoreet ac. Sed ac nibh eleifend, dictum ipsum in, aliquet lorem. Cras eu tempus neque. Suspendisse vitae lacus condimentum, malesuada est et, ultrices ligula. Praesent sit amet massa tincidunt, egestas metus vel, pharetra mauris.",
				qualifications:
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vehicula finibus placerat. In hac habitasse platea dictumst. Sed iaculis mollis tellus id vulputate. Aliquam nisl ligula, tempor eu ipsum vel, faucibus egestas ipsum. Vestibulum volutpat purus risus, sit amet posuere sem laoreet ac. Sed ac nibh eleifend, dictum ipsum in, aliquet lorem. Cras eu tempus neque. Suspendisse vitae lacus condimentum, malesuada est et, ultrices ligula. Praesent sit amet massa tincidunt, egestas metus vel, pharetra mauris.",
				datePosted: "2024-08-05",
				salary: 1000,
				applicants: [
					{
						id: "1",
						dateApplied: "2024-08-05",
						name: "John Doe",
						companyName: "Company",
						address: "123 Street, Toronto, ON",
						phone: "123-456-7890",
						email: "john.doe@email.com",
						education: [
							{
								title: "Bachelor of Computer Science",
								description:
									"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vehicula finibus placerat. In hac habitasse platea dictumst. Sed iaculis mollis tellus id vulputate. Aliquam nisl ligula, tempor eu ipsum vel, faucibus egestas ipsum. Vestibulum volutpat purus risus, sit amet posuere sem laoreet ac. Sed ac nibh eleifend, dictum ipsum in, aliquet lorem.",
								startDate: "2020-09-01",
								endDate: "2024-06-01",
								completionStatus: true,
							},
						],
						experience: [
							{
								title: "Software Developer",
								description:
									"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vehicula finibus placerat. In hac habitasse platea dictumst. Sed iaculis mollis tellus id vulputate. Aliquam nisl ligula, tempor eu ipsum vel, faucibus egestas ipsum. Vestibulum volutpat purus risus, sit amet posuere sem laoreet ac. Sed ac nibh eleifend, dictum ipsum in, aliquet lorem.",
								startDate: "2024-06-01",
								endDate: "2024-08-01",
							},
						],
						certifications: [
							{
								title: "Certificate of Completion",
								description:
									"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vehicula finibus placerat. In hac habitasse platea dictumst. Sed iaculis mollis tellus id vulputate. Aliquam nisl ligula, tempor eu ipsum vel, faucibus egestas ipsum. Vestibulum volutpat purus risus, sit amet posuere sem laoreet ac. Sed ac nibh eleifend, dictum ipsum in, aliquet lorem.",
								issueDate: "2024-08-01",
							},
						],
						availability: [
							{
								day: "Monday",
								from: "09:00",
								to: "17:00",
							},
						],
						previousProjects: [
							{
								title: "Project 1",
								description:
									"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vehicula finibus placerat. In hac habitasse platea dictumst. Sed iaculis mollis tellus id vulputate. Aliquam nisl ligula, tempor eu ipsum vel, faucibus egestas ipsum. Vestibulum volutpat purus risus, sit amet posuere sem laoreet ac. Sed ac nibh eleifend, dictum ipsum in, aliquet lorem.",
								startDate: "2024-06-01",
								endDate: "2024-08-01",
							},
						],
						badges: [
							{
								title: "Badge 1",
								description:
									"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vehicula finibus placerat. In hac habitasse platea dictumst. Sed iaculis mollis tellus id vulputate. Aliquam nisl ligula, tempor eu ipsum vel, faucibus egestas ipsum. Vestibulum volutpat purus risus, sit amet posuere sem laoreet ac. Sed ac nibh eleifend, dictum ipsum in, aliquet lorem.",
							},
						],
						references: [
							{
								name: "Jane Doe",
								companyName: "Company",
								phone: "123-456-7890",
								email: "jane.doe@email.com",
							},
						],
					},
					{
						id: "2",
						dateApplied: "2024-08-05",
						name: "Jane Doe",
						companyName: "Company",
						address: "123 Street, Toronto, ON",
						phone: "123-456-7890",
						email: "jane.doe@email.com",
						education: [
							{
								title: "Bachelor of Computer Science",
								description:
									"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vehicula finibus placerat. In hac habitasse platea dictumst. Sed iaculis mollis tellus id vulputate. Aliquam nisl ligula, tempor eu ipsum vel, faucibus egestas ipsum. Vestibulum volutpat purus risus, sit amet posuere sem laoreet ac. Sed ac nibh eleifend, dictum ipsum in, aliquet lorem.",
								startDate: "2020-09-01",
								endDate: "2024-06-01",
								completionStatus: true,
							},
							{
								title: "Master of Computer Science",
								description:
									"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vehicula finibus placerat. In hac habitasse platea dictumst. Sed iaculis mollis tellus id vulputate. Aliquam nisl ligula, tempor eu ipsum vel, faucibus egestas ipsum. Vestibulum volutpat purus risus, sit amet posuere sem laoreet ac. Sed ac nibh eleifend, dictum ipsum in, aliquet lorem.",
								startDate: "2024-09-01",
								endDate: null,
								completionStatus: false,
							},
						],
						experience: [
							{
								title: "Software Developer",
								description:
									"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vehicula finibus placerat. In hac habitasse platea dictumst. Sed iaculis mollis tellus id vulputate. Aliquam nisl ligula, tempor eu ipsum vel, faucibus egestas ipsum. Vestibulum volutpat purus risus, sit amet posuere sem laoreet ac. Sed ac nibh eleifend, dictum ipsum in, aliquet lorem.",
								startDate: "2024-06-01",
								endDate: null,
							},
							{
								title: "Intern Developer",
								description:
									"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vehicula finibus placerat. In hac habitasse platea dictumst. Sed iaculis mollis tellus id vulputate. Aliquam nisl ligula, tempor eu ipsum vel, faucibus egestas ipsum. Vestibulum volutpat purus risus, sit amet posuere sem laoreet ac. Sed ac nibh eleifend, dictum ipsum in, aliquet lorem.",
								startDate: "2024-03-01",
								endDate: "2024-06-01",
							},
						],
						certifications: [
							{
								title: "Certificate of Completion",
								description:
									"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vehicula finibus placerat. In hac habitasse platea dictumst. Sed iaculis mollis tellus id vulputate. Aliquam nisl ligula, tempor eu ipsum vel, faucibus egestas ipsum. Vestibulum volutpat purus risus, sit amet posuere sem laoreet ac. Sed ac nibh eleifend, dictum ipsum in, aliquet lorem.",
								issueDate: "2024-08-01",
							},
						],
						availability: [
							{
								day: "Monday",
								from: "09:00",
								to: "17:00",
							},
							{
								day: "Tuesday",
								from: "09:00",
								to: "17:00",
							},
							{
								day: "Wednesday",
								from: "09:00",
								to: "17:00",
							},
							{
								day: "Thursday",
								from: "09:00",
								to: "17:00",
							},
							{
								day: "Friday",
								from: "09:00",
								to: "17:00",
							},
						],
						previousProjects: [
							{
								title: "Project 1",
								description:
									"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vehicula finibus placerat. In hac habitasse platea dictumst. Sed iaculis mollis tellus id vulputate. Aliquam nisl ligula, tempor eu ipsum vel, faucibus egestas ipsum. Vestibulum volutpat purus risus, sit amet posuere sem laoreet ac. Sed ac nibh eleifend, dictum ipsum in, aliquet lorem.",
								startDate: "2024-06-01",
								endDate: "2024-08-01",
							},
						],
						badges: [
							{
								title: "Badge 1",
								description:
									"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vehicula finibus placerat. In hac habitasse platea dictumst. Sed iaculis mollis tellus id vulputate. Aliquam nisl ligula, tempor eu ipsum vel, faucibus egestas ipsum. Vestibulum volutpat purus risus, sit amet posuere sem laoreet ac. Sed ac nibh eleifend, dictum ipsum in, aliquet lorem.",
							},
							{
								title: "Badge 2",
								description:
									"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vehicula finibus placerat. In hac habitasse platea dictumst. Sed iaculis mollis tellus id vulputate. Aliquam nisl ligula, tempor eu ipsum vel, faucibus egestas ipsum. Vestibulum volutpat purus risus, sit amet posuere sem laoreet ac. Sed ac nibh eleifend, dictum ipsum in, aliquet lorem.",
							},
						],
						references: [
							{
								name: "Jane Doe",
								companyName: "Company",
								phone: "123-456-7890",
								email: "jane.doe@email.com",
							},
							{
								name: "Jane Smith",
								companyName: "Company",
								phone: "123-456-7890",
								email: "jane.smith@email.com",
							},
						],
					},
				],
			},
		],
	},
	{
		id: "2",
		name: "Project 2",
		progress: 15,
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
		objective:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
		initiative:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
		time: "every Mon and Wed, 6:00 - 6:30pm",
		date: "Jan 1 - 31, 2023",
		location: "Community center",
		spots: 11,
		cost: 20,
		milestones: [
			{
				_id: "1",
				type: "Milestone",
				title: "Milestone 1",
				progress: 17,
				description:
					"Lorem ipsum dolor sit amet consectetur. Id maecenas tortor porta ultrices faucibus. Sed potenti ac egestas in. Vitae pellentesque arcu ornare eu elit habitant in odio. Quis urna montes risus luctus. Tortor arcu sit condimentum commodo sit sed suscipit vel. Viverra diam nisl tristique mauris diam. Facilisi quam id tincidunt faucibus non gravida nisl vivamus faucibus. Dignissim vitae gravida amet id cursus at. Erat tincidunt amet id lacus nunc suspendisse ac sit auctor. Ut integer eget ut massa mattis quam donec consequat at.",
				completedBy: "John Doe",
				dateStarted: "2023-06-01",
				dateCompleted: "2023-08-22",
			},
			{
				_id: "2",
				type: "Milestone",
				title: "Milestone 2",
				progress: 7,
				description:
					"Lorem ipsum dolor sit amet consectetur. Vitae cum eget dolor vehicula massa porttitor tortor eget. Vitae egestas lorem viverra sit. Arcu placerat suspendisse ac eget sed. Ut etiam ut sit cursus sem.",
				completedBy: "John Doe",
				dateStarted: "2021-08-01",
				dateCompleted: "2021-08-15",
			},
		],
		volunteerPositions: [
			{
				id: "1",
				title: "Volunteering Title 1",
				responsibilities:
					"Lorem ipsum dolor sit amet consectetur. Id maecenas tortor porta ultrices faucibus. Sed potenti ac egestas in. Vitae pellentesque arcu ornare eu elit habitant in odio. Quis urna montes risus luctus. Tortor arcu sit condimentum commodo sit sed suscipit vel. Viverra diam nisl tristique mauris diam. Facilisi quam id tincidunt faucibus non gravida nisl vivamus faucibus. Dignissim vitae gravida amet id cursus at. Erat tincidunt amet id lacus nunc suspendisse ac sit auctor. Ut integer eget ut massa mattis quam donec consequat at.",
				skills: ["Skill 1", "Skill 2", "Skill 3"],
			},
			{
				id: "2",
				title: "Volunteering Title 2",
				responsibilities:
					"Lorem ipsum dolor sit amet consectetur. Id maecenas tortor porta ultrices faucibus. Sed potenti ac egestas in. Vitae pellentesque arcu ornare eu elit habitant in odio. Quis urna montes risus luctus. Tortor arcu sit condimentum commodo sit sed suscipit vel. Viverra diam nisl tristique mauris diam. Facilisi quam id tincidunt faucibus non gravida nisl vivamus faucibus. Dignissim vitae gravida amet id cursus at. Erat tincidunt amet id lacus nunc suspendisse ac sit auctor. Ut integer eget ut massa mattis quam donec consequat at.",
				skills: ["Skill 1", "Skill 2", "Skill 3"],
			},
			{
				id: "3",
				title: "Volunteering Title 3",
				responsibilities:
					"Lorem ipsum dolor sit amet consectetur. Id maecenas tortor porta ultrices faucibus. Sed potenti ac egestas in. Vitae pellentesque arcu ornare eu elit habitant in odio. Quis urna montes risus luctus. Tortor arcu sit condimentum commodo sit sed suscipit vel. Viverra diam nisl tristique mauris diam. Facilisi quam id tincidunt faucibus non gravida nisl vivamus faucibus. Dignissim vitae gravida amet id cursus at. Erat tincidunt amet id lacus nunc suspendisse ac sit auctor. Ut integer eget ut massa mattis quam donec consequat at.",
				skills: ["Skill 1", "Skill 2", "Skill 3"],
			},
		],
		openRoles: [
			{
				id: "1",
				title: "Software Developer",
				project: "An Interesting Project", // When sorted by project, this one should come first
				location: "Toronto, ON",
				description:
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vehicula finibus placerat. In hac habitasse platea dictumst. Sed iaculis mollis tellus id vulputate. Aliquam nisl ligula, tempor eu ipsum vel, faucibus egestas ipsum. Vestibulum volutpat purus risus, sit amet posuere sem laoreet ac. Sed ac nibh eleifend, dictum ipsum in, aliquet lorem. Cras eu tempus neque. Suspendisse vitae lacus condimentum, malesuada est et, ultrices ligula. Praesent sit amet massa tincidunt, egestas metus vel, pharetra mauris.",
				qualifications:
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vehicula finibus placerat. In hac habitasse platea dictumst. Sed iaculis mollis tellus id vulputate. Aliquam nisl ligula, tempor eu ipsum vel, faucibus egestas ipsum. Vestibulum volutpat purus risus, sit amet posuere sem laoreet ac. Sed ac nibh eleifend, dictum ipsum in, aliquet lorem. Cras eu tempus neque. Suspendisse vitae lacus condimentum, malesuada est et, ultrices ligula. Praesent sit amet massa tincidunt, egestas metus vel, pharetra mauris.",
				datePosted: "2024-08-08", // when sorted by date, this one should come first (latest)
				salary: null,
				applicants: [
					{
						id: "1",
						dateApplied: "2024-08-05",
						name: "John Doe",
						companyName: "Company",
						address: "123 Street, Toronto, ON",
						phone: "123-456-7890",
						email: "john.doe@email.com",
						education: [
							{
								title: "Bachelor of Computer Science",
								description:
									"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vehicula finibus placerat. In hac habitasse platea dictumst. Sed iaculis mollis tellus id vulputate. Aliquam nisl ligula, tempor eu ipsum vel, faucibus egestas ipsum. Vestibulum volutpat purus risus, sit amet posuere sem laoreet ac. Sed ac nibh eleifend, dictum ipsum in, aliquet lorem.",
								startDate: "2020-09-01",
								endDate: "2024-06-01",
								completionStatus: true,
							},
						],
						experience: [
							{
								title: "Software Developer",
								description:
									"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vehicula finibus placerat. In hac habitasse platea dictumst. Sed iaculis mollis tellus id vulputate. Aliquam nisl ligula, tempor eu ipsum vel, faucibus egestas ipsum. Vestibulum volutpat purus risus, sit amet posuere sem laoreet ac. Sed ac nibh eleifend, dictum ipsum in, aliquet lorem.",
								startDate: "2024-06-01",
								endDate: "2024-08-01",
							},
						],
						certifications: [
							{
								title: "Certificate of Completion",
								description:
									"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vehicula finibus placerat. In hac habitasse platea dictumst. Sed iaculis mollis tellus id vulputate. Aliquam nisl ligula, tempor eu ipsum vel, faucibus egestas ipsum. Vestibulum volutpat purus risus, sit amet posuere sem laoreet ac. Sed ac nibh eleifend, dictum ipsum in, aliquet lorem.",
								issueDate: "2024-08-01",
							},
						],
						availability: [
							{
								day: "Monday",
								from: "09:00",
								to: "17:00",
							},
						],
						previousProjects: [
							{
								title: "Project 1",
								description:
									"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vehicula finibus placerat. In hac habitasse platea dictumst. Sed iaculis mollis tellus id vulputate. Aliquam nisl ligula, tempor eu ipsum vel, faucibus egestas ipsum. Vestibulum volutpat purus risus, sit amet posuere sem laoreet ac. Sed ac nibh eleifend, dictum ipsum in, aliquet lorem.",
								startDate: "2024-06-01",
								endDate: "2024-08-01",
							},
						],
						badges: [
							{
								title: "Badge 1",
								description:
									"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vehicula finibus placerat. In hac habitasse platea dictumst. Sed iaculis mollis tellus id vulputate. Aliquam nisl ligula, tempor eu ipsum vel, faucibus egestas ipsum. Vestibulum volutpat purus risus, sit amet posuere sem laoreet ac. Sed ac nibh eleifend, dictum ipsum in, aliquet lorem.",
							},
						],
						references: [
							{
								name: "Jane Doe",
								companyName: "Company",
								phone: "123-456-7890",
								email: "jane.doe@email.com",
							},
						],
					},
				],
			},
			{
				id: "2",
				title: "A HR Manager", // When sorted by title, this one should come first
				project: "Interesting Project",
				location: "Toronto, ON",
				description:
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vehicula finibus placerat. In hac habitasse platea dictumst. Sed iaculis mollis tellus id vulputate. Aliquam nisl ligula, tempor eu ipsum vel, faucibus egestas ipsum. Vestibulum volutpat purus risus, sit amet posuere sem laoreet ac. Sed ac nibh eleifend, dictum ipsum in, aliquet lorem. Cras eu tempus neque. Suspendisse vitae lacus condimentum, malesuada est et, ultrices ligula. Praesent sit amet massa tincidunt, egestas metus vel, pharetra mauris.",
				qualifications:
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vehicula finibus placerat. In hac habitasse platea dictumst. Sed iaculis mollis tellus id vulputate. Aliquam nisl ligula, tempor eu ipsum vel, faucibus egestas ipsum. Vestibulum volutpat purus risus, sit amet posuere sem laoreet ac. Sed ac nibh eleifend, dictum ipsum in, aliquet lorem. Cras eu tempus neque. Suspendisse vitae lacus condimentum, malesuada est et, ultrices ligula. Praesent sit amet massa tincidunt, egestas metus vel, pharetra mauris.",
				datePosted: "2024-08-05",
				salary: null,
				applicants: [
					{
						id: "1",
						dateApplied: "2024-08-05",
						name: "John Doe",
						companyName: "Company",
						address: "123 Street, Toronto, ON",
						phone: "123-456-7890",
						email: "john.doe@email.com",
						education: [
							{
								title: "Bachelor of Computer Science",
								description:
									"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vehicula finibus placerat. In hac habitasse platea dictumst. Sed iaculis mollis tellus id vulputate. Aliquam nisl ligula, tempor eu ipsum vel, faucibus egestas ipsum. Vestibulum volutpat purus risus, sit amet posuere sem laoreet ac. Sed ac nibh eleifend, dictum ipsum in, aliquet lorem.",
								startDate: "2020-09-01",
								endDate: "2024-06-01",
								completionStatus: true,
							},
						],
						experience: [
							{
								title: "Software Developer",
								description:
									"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vehicula finibus placerat. In hac habitasse platea dictumst. Sed iaculis mollis tellus id vulputate. Aliquam nisl ligula, tempor eu ipsum vel, faucibus egestas ipsum. Vestibulum volutpat purus risus, sit amet posuere sem laoreet ac. Sed ac nibh eleifend, dictum ipsum in, aliquet lorem.",
								startDate: "2024-06-01",
								endDate: "2024-08-01",
							},
						],
						certifications: [
							{
								title: "Certificate of Completion",
								description:
									"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vehicula finibus placerat. In hac habitasse platea dictumst. Sed iaculis mollis tellus id vulputate. Aliquam nisl ligula, tempor eu ipsum vel, faucibus egestas ipsum. Vestibulum volutpat purus risus, sit amet posuere sem laoreet ac. Sed ac nibh eleifend, dictum ipsum in, aliquet lorem.",
								issueDate: "2024-08-01",
							},
						],
						availability: [
							{
								day: "Monday",
								from: "09:00",
								to: "17:00",
							},
						],
						previousProjects: [
							{
								title: "Project 1",
								description:
									"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vehicula finibus placerat. In hac habitasse platea dictumst. Sed iaculis mollis tellus id vulputate. Aliquam nisl ligula, tempor eu ipsum vel, faucibus egestas ipsum. Vestibulum volutpat purus risus, sit amet posuere sem laoreet ac. Sed ac nibh eleifend, dictum ipsum in, aliquet lorem.",
								startDate: "2024-06-01",
								endDate: "2024-08-01",
							},
						],
						badges: [
							{
								title: "Badge 1",
								description:
									"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vehicula finibus placerat. In hac habitasse platea dictumst. Sed iaculis mollis tellus id vulputate. Aliquam nisl ligula, tempor eu ipsum vel, faucibus egestas ipsum. Vestibulum volutpat purus risus, sit amet posuere sem laoreet ac. Sed ac nibh eleifend, dictum ipsum in, aliquet lorem.",
							},
						],
						references: [
							{
								name: "Jane Doe",
								companyName: "Company",
								phone: "123-456-7890",
								email: "jane.doe@email.com",
							},
						],
					},
				],
			},
		],
	},
	{
		id: "3",
		name: "Project 3",
		progress: 88,
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
		objective:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
		initiative:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
		time: "every Mon and Wed, 6:00 - 6:30pm",
		date: "Jan 1 - 31, 2023",
		location: "Community center",
		spots: 5,
		cost: 75,
		milestones: [
			{
				_id: "1",
				type: "Milestone",
				title: "Milestone 1",
				progress: 100,
				description:
					"Lorem ipsum dolor sit amet consectetur. Id maecenas tortor porta ultrices faucibus. Sed potenti ac egestas in. Vitae pellentesque arcu ornare eu elit habitant in odio. Quis urna montes risus luctus. Tortor arcu sit condimentum commodo sit sed suscipit vel. Viverra diam nisl tristique mauris diam. Facilisi quam id tincidunt faucibus non gravida nisl vivamus faucibus. Dignissim vitae gravida amet id cursus at. Erat tincidunt amet id lacus nunc suspendisse ac sit auctor. Ut integer eget ut massa mattis quam donec consequat at.",
				completedBy: "John Doe",
				dateStarted: "2023-06-01",
				dateCompleted: "2023-08-22",
			},
			{
				_id: "2",
				type: "Milestone",
				title: "Milestone 2",
				progress: 100,
				description:
					"Lorem ipsum dolor sit amet consectetur. Vitae cum eget dolor vehicula massa porttitor tortor eget. Vitae egestas lorem viverra sit. Arcu placerat suspendisse ac eget sed. Ut etiam ut sit cursus sem.",
				completedBy: "John Doe",
				dateStarted: "2021-08-01",
				dateCompleted: "2021-08-15",
			},
			{
				_id: "3",
				type: "Milestone",
				title: "Milestone 3",
				progress: 20,
				description:
					"Lorem ipsum dolor sit amet consectetur. Vitae cum eget dolor vehicula massa porttitor tortor eget. Vitae egestas lorem viverra sit. Arcu placerat suspendisse ac eget sed. Ut etiam ut sit cursus sem.",
				completedBy: "John Doe",
				dateStarted: "2024-08-01",
				dateCompleted: "2024-08-15",
			},
		],
		volunteerPositions: [
			{
				id: "1",
				title: "Volunteering Title 1",
				responsibilities:
					"Lorem ipsum dolor sit amet consectetur. Id maecenas tortor porta ultrices faucibus. Sed potenti ac egestas in. Vitae pellentesque arcu ornare eu elit habitant in odio. Quis urna montes risus luctus. Tortor arcu sit condimentum commodo sit sed suscipit vel. Viverra diam nisl tristique mauris diam. Facilisi quam id tincidunt faucibus non gravida nisl vivamus faucibus. Dignissim vitae gravida amet id cursus at. Erat tincidunt amet id lacus nunc suspendisse ac sit auctor. Ut integer eget ut massa mattis quam donec consequat at.",
				skills: ["Skill 1", "Skill 2", "Skill 3"],
			},
		],
		openRoles: null,
	},
];

type ProjectsContextType = {
	projects: Project[];
	setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
};

type ProjectsContextProviderProps = {
	children: React.ReactNode;
};

export const ProjectsContext = createContext<ProjectsContextType>({
	projects: [],
	setProjects: () => {},
});

export const ProjectsContextProvider = ({
	children,
}: ProjectsContextProviderProps) => {
	const [projects, setProjects] = useState<Project[]>(data);

	return (
		<ProjectsContext.Provider value={{ projects, setProjects }}>
			{children}
		</ProjectsContext.Provider>
	);
};
