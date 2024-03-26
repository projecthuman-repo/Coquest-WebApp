import { Container } from "@mui/material";
import React, { useCallback } from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { sanitizePage, RegistrationPages } from "./utils";
import { Link } from "react-router-dom";
import { userModel } from "../../models/userobserver";

function Orientation() {
    const [hasError, setHasError] = useState(false);
    const { id } = useParams();
    // page is one-indexed
    const [page, setPage] = useState(1);
    let navigate = useNavigate();

    // Alter variadic portion of the URL to the parameter, newSlug.
    const changeSlug = useCallback((newSlug: string) => {
        navigate(`/registration/${newSlug}`);
    }, [navigate]);

    // Change the current page number to the parameter, page.
    // The function will adjust the value to the nearest page boundary if the value provided is out of bounds.
    const changePage = useCallback((page: number) => {
        const newPage = sanitizePage(page);
        // Save page progress as the user progresses through the orientation process
        userModel.registered = newPage;
        changeSlug(newPage.toString());
        setPage(newPage);
    }, [changeSlug]);

    function updateData(data: any) {
        RegistrationPages[page - 1].dataSetter(data);
    }

    useEffect(() => {
        const handlePageId = () => {
            let initialPage = 0;
            if (id) {
                const parsedId = +id;
                if (!isNaN(parsedId)) {
                    initialPage = parsedId;
                    changePage(initialPage);
                } else {
                    setHasError(true);
                }
            }
        }

        handlePageId();
    }, [id, navigate, changePage]);

    if(hasError) {
        return (
            <Container>
                <h1>Oops, this page doesn&#39;t exist!</h1>
                <p>Did you mean to <Link to="/registration">register</Link>?</p>
            </Container>
        );
    } else {
        // Convert to zero-indexing to access correct indices in component array.
        // From this point onward, we can assume index will always be a valid index.
        const index = page - 1;

        const SelectedPageView = RegistrationPages[index].view;
        return (
            <Container>
                <h1>Step {page}: {RegistrationPages[index].title}</h1>

                <SelectedPageView updateData={updateData} />

                <IconButton title="Previous page" onClick={() => {
                    const newPage = page - 1;
                    changePage(newPage)
                    }}>
                    <ChevronLeft />

                </IconButton>
                <IconButton title="Next page" onClick={() => {
                    const newPage = page + 1;
                    changePage(newPage)
                    }}>
                    <ChevronRight />
                </IconButton>
            </Container>
        );
    }
}

export default Orientation;
