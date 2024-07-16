import React, { useState } from "react";
import InputMask from "react-input-mask";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./SharedCalendar.css";

function SharedCalendar() {
	// Navigation Button Variable
	const [currentView, setCurrentView] = useState("calendar");

	// Event Variables
	interface Event {
		id: string;
		title: string;
		start: string;
		end: string;
		description: string;
	}
	const [events, setEvents] = useState<Event[]>([]);
	const [currentEvent, setCurrentEvent] = useState<Event>();

	// Event Update Variables
	const [newTitle, setNewTitle] = useState("");
	const [newStartDate, setNewStartDate] = useState("");
	const [newEndDate, setNewEndDate] = useState("");
	const [newDescription, setNewDescription] = useState("");

	// NOTE: Currently there is no way to fetch all events from a calendar (either from a specific user or everyone involved.)
	//       Once implemented, a useEffect should be used to get the data from the backend and set the events state.

	function generateID() {
		return Math.random().toString(36).substr(2, 9);
	}

	async function addEvent() {
		const newEvent = {
			id: generateID(),
			title: newTitle,
			start: newStartDate,
			end: newEndDate,
			description: newDescription,
		};

		setEvents((events) => [...events, newEvent]);
		setCurrentEvent(newEvent);

		/* try {
      // TODO: Replace placeholder information (URL, Email, etc.) with the correct backend information when setup.
      const response = await fetch("http://localhost:3001/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: newEvent.id,
          email: "temp-email@gmail.com",
          calendar_name: "Test Calendar",
          event_name: newEvent.title,
          start_date_time: newEvent.start,
          end_date_time: newEvent.end,
          description: newEvent.description,
        }),
      });
      response.json().then((body) => {
        if (body.error) {
          console.log("Error:", body.error);
        } else {
          setEvents((events) => [...events, newEvent]);
          setCurrentEvent(newEvent);
        }
      });
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    } */
	}

	async function modifyEvent() {
		const modifiedEvent = {
			id: currentEvent?.id || "",
			title: newTitle !== "" ? newTitle : currentEvent?.title || "",
			start:
				newStartDate !== "" ? newStartDate : currentEvent?.start || "",
			end: newEndDate !== "" ? newEndDate : currentEvent?.end || "",
			description:
				newDescription !== ""
					? newDescription
					: currentEvent?.description || "",
		};

		const updatedEvents = events.filter(
			(event) => event.id !== currentEvent?.id,
		);
		setEvents(() => [...updatedEvents, modifiedEvent]);
		setCurrentEvent(modifiedEvent);
		setCurrentView("event");

		/* try {
      // TODO: Replace placeholder information (URL, Email, etc.) with the correct backend information when setup.
      const response = await fetch("http://localhost:3001/events", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event_id: currentEvent?.id,
        }),
      });
      response.json().then((body) => {
        if (body.error) {
          console.log("Error:", body.error);
        } else {
          const updatedEvents = events.filter(
            (event) => event.id !== currentEvent?.id
          );
          setEvents((events) => [...updatedEvents, modifiedEvent]);
          setCurrentEvent(modifiedEvent);
          setCurrentView("event");
        }
      });
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    } */
	}

	async function deleteEvent() {
		const updatedEvents = events.filter(
			(event) => event.id !== currentEvent?.id,
		);
		setEvents(updatedEvents);
		setCurrentView("calendar");

		/* try {
      // TODO: Replace placeholder information (URL, Email, etc.) with the correct backend information when setup.
      const response = await fetch("http://localhost:3001/events", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event_id: currentEvent?.id,
        }),
      });
      response.json().then((body) => {
        if (body.error) {
          console.log("Error:", body.error);
        } else {
          const updatedEvents = events.filter(
            (event) => event.id !== currentEvent?.id
          );
          setEvents(updatedEvents);
          setCurrentView("calendar");
        }
      });
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    } */
	}

	async function displayEventInfo(clickInfo: any) {
		const event = events.find((event) => event.id === clickInfo.event.id);
		setCurrentEvent(event);
		setCurrentView("event");
	}

	const handleStartDateChange = (event: any) => {
		setNewStartDate(event.target.value);
	};

	const handleEndDateChange = (event: any) => {
		setNewEndDate(event.target.value);
	};

	const resetDateValues = () => {
		setNewStartDate("");
		setNewEndDate("");
	};

	return (
		<>
			{currentView === "calendar" && (
				<div className="shared-calendar-component">
					<FullCalendar
						plugins={[
							dayGridPlugin,
							timeGridPlugin,
							interactionPlugin,
						]}
						initialView="dayGridMonth"
						selectable={true}
						headerToolbar={{
							left: "title",
							right: "prev,next",
						}}
						eventClick={displayEventInfo}
						events={events}
						select={() => {
							resetDateValues();
							setCurrentView("add-event");
						}}
					/>
				</div>
			)}
			{currentView === "event" && (
				<>
					<div className="calendar-main">
						<div className="calendar-event-container">
							<p className="calendar-main-heading">
								{currentEvent?.title}
							</p>
							<div className="calendar-button-group">
								<button
									className="calendar-event-modify calendar-sub-heading"
									onClick={() => {
										resetDateValues();
										setCurrentView("modify-event");
									}}
								>
									Modify
								</button>
								<button
									className="calendar-event-exit calendar-sub-heading"
									onClick={() => setCurrentView("calendar")}
								>
									Exit
								</button>
							</div>
						</div>
						<p className="calendar-sub-heading margin-bottom">
							{currentEvent?.start} - {currentEvent?.end}
						</p>
						<p className="calendar-sub-heading">Description</p>
						<p>{currentEvent?.description}</p>
					</div>
				</>
			)}
			{currentView === "add-event" && (
				<>
					<div className="calendar-cm-event-container">
						<p className="calendar-main-heading margin-bottom">
							Create New Event
						</p>
						<div className="calendar-form-container">
							<p className="calendar-sub-heading margin-bottom">
								Title
							</p>
							<input
								placeholder="Title"
								onChange={(e) => setNewTitle(e.target.value)}
								className="cal-input-design margin-bottom"
							></input>
							<p className="calendar-sub-heading margin-bottom">
								Start and End Date
							</p>
							<InputMask
								mask="9999-99-99"
								maskChar={null}
								value={newStartDate}
								onChange={handleStartDateChange}
								className="cal-input-design margin-bottom"
								alt="Start Date"
								title="Start Date Input"
								placeholder="Start Date"
								type="text"
							/>
							<InputMask
								mask="9999-99-99"
								maskChar={null}
								value={newEndDate}
								onChange={handleEndDateChange}
								className="cal-input-design margin-bottom"
								alt="End Date"
								title="End Date"
								placeholder="End Date"
								type="text"
							/>
							<p className="calendar-sub-heading margin-bottom">
								Description
							</p>
							<textarea
								placeholder="Description"
								onChange={(e) =>
									setNewDescription(e.target.value)
								}
								className="cal-textarea-design"
							></textarea>
						</div>
						<div className="calendar-button-group">
							<button
								className="calendar-button-submit calendar-sub-heading"
								onClick={() => {
									addEvent();
									setCurrentView("event");
								}}
							>
								Create
							</button>
							<button
								onClick={() => {
									setCurrentView("calendar");
								}}
								className="calendar-button-submit calendar-sub-heading"
							>
								Cancel
							</button>
						</div>
					</div>
				</>
			)}
			{currentView === "modify-event" && (
				<>
					<div className="calendar-cm-event-container">
						<p className="calendar-main-heading margin-bottom">
							Modify Event
						</p>
						<div className="calendar-form-container">
							<p className="calendar-sub-heading margin-bottom">
								Title
							</p>
							<input
								placeholder={currentEvent?.title}
								onChange={(e) => setNewTitle(e.target.value)}
								className="cal-input-design margin-bottom"
							></input>
							<p className="calendar-sub-heading margin-bottom">
								Start and End Date
							</p>
							<InputMask
								mask="9999-99-99"
								maskChar={null}
								value={newStartDate}
								onChange={handleStartDateChange}
								className="cal-input-design margin-bottom"
								alt="Start Date"
								title="Start Date Input"
								placeholder={currentEvent?.start}
								type="text"
							/>
							<InputMask
								mask="9999-99-99"
								maskChar={null}
								value={newEndDate}
								onChange={handleEndDateChange}
								className="cal-input-design margin-bottom"
								alt="End Date"
								title="End Date Input"
								placeholder={currentEvent?.end}
								type="text"
							/>
							<p className="calendar-sub-heading margin-bottom">
								Description
							</p>
							<textarea
								placeholder={currentEvent?.description}
								onChange={(e) =>
									setNewDescription(e.target.value)
								}
								className="cal-textarea-design"
							></textarea>
						</div>
						<div className="calendar-button-group">
							<button
								className="calendar-button-submit calendar-sub-heading"
								onClick={() => modifyEvent()}
							>
								Modify
							</button>
							<button
								className="calendar-button-submit calendar-sub-heading"
								onClick={() => deleteEvent()}
							>
								Delete
							</button>
							<button
								className="calendar-button-cancel calendar-sub-heading"
								onClick={() => setCurrentView("event")}
							>
								Cancel
							</button>
						</div>
					</div>
				</>
			)}
		</>
	);
}

export default SharedCalendar;
