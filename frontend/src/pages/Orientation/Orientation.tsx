import { Container } from "@mui/material";
import React, { useCallback } from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { sanitizePage, RegistrationPages, update, NUMPAGES } from "./utils";
import { Link } from "react-router-dom";
import { User } from "../../models/usermodel";
import Repository from "../../repositories/repository";
import { subscribeToUserModelSubject } from "../../observers/userobserver";
import './Orientation.css';

function Orientation() {
    const [user, setUser] = useState<User>();
    const [hasError, setHasError] = useState(false);
    const { id } = useParams();
    // page is one-indexed
    const [page, setPage] = useState(1);
    // ensure runtime fetches user info before rendering the dependant child components
    const [done, setDone] = useState(false);
    let navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = subscribeToUserModelSubject((user: User) => {
            if(!done) {
                // Note: This statement won't cause the subsequent if(done) to be true
                setDone(true);
            }
            setUser(user);
            
            // Only update when the user actually makes changes after the content fully renders.
            if(done) {
                const repo = Repository.getInstance('User', User);
                repo.update(user);
            }
        });
        return () => {
            unsubscribe.then(cleanup => cleanup && cleanup());
        }
    }, [done]);

    // Alter variadic portion of the URL to the parameter, newSlug.
    const changeSlug = useCallback((newSlug: string) => {
        navigate(`/registration/${newSlug}`);
    }, [navigate]);

    // Change the current page number to the parameter, page.
    // The function will adjust the value to the nearest page boundary if the value provided is out of bounds.
    const changePage = useCallback((page: number) => {
        const newPage = sanitizePage(page);
        // Save page progress as the user progresses through the orientation process
        update({registered: newPage})
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

    function submit() {
        update({registered: true});
    }

    if(hasError) {
        return (
            <Container>
                <h1>Oops, this page doesn&#39;t exist!</h1>
                <p>Did you mean to <Link to="/registration">register</Link>?</p>
            </Container>
        );
    } else if(done){
        // Convert to zero-indexing to access correct indices in component array.
        // From this point onward, we can assume index will always be a valid index.
        const index = page - 1;

        const SelectedPageView = RegistrationPages[index].view;
        return (
            <Container className="orientation">
                
                <div className="content">
                    <SelectedPageView user={user} updateData={updateData} />
                </div>
                <div className="icon-button-container">
                    <div>
                        { page > 1 &&
                            <IconButton className="icon-button" title="Previous page" onClick={() => {
                                const newPage = page - 1;
                                changePage(newPage)
                                }}>
                                <ChevronLeft />
                            </IconButton>
                        }
                    </div>
                    
                    <div>
                        { page < NUMPAGES ?
                            <IconButton className="icon-button"title="Next page" onClick={() => {
                                const newPage = page + 1;
                                changePage(newPage)
                                }}>
                                <ChevronRight />
                            </IconButton>
                            :
                            <button onClick={submit}>Continue</button>
                        }
                    </div>
                </div>
            </Container>
        );
    } else {
        return null;
    }
}

export default Orientation;
