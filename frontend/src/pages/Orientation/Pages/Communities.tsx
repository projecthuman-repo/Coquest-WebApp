import React, { useState } from "react";
import SimpleCard from "../../../components/SimpleCard/SimpleCard";
import '../Orientation.css';
import './Communities.css';

function Communities() {
    // Temporary simulation
    function curateCommunityList() {
        let sampleresponse =  {
            data: {
                getCommunities: [
                    {
                        communityID: 1,
                        name: "Basketball",
                    },
                    {
                        communityID: 2,
                        name: "Music",
                    },
                    {
                        communityID: 3,
                        name: "Digital Art",
                    },
                    {
                        communityID: 4,
                        name: "Food",
                    },
                ]
            }
        }

        return sampleresponse.data.getCommunities;
    }

    const [communities, setCommunities] = useState(curateCommunityList());

    return (
        <div>
            <h3 className="main-heading">Let’s get you stitched in.</h3>
            <p className="sub-heading">Check out these layers!</p>
            <p className="sub-text">Layers are small communities with like-minded people. You can participate in group activities and projects here.</p>
            {communities.map(
                (community) => (
                    <>
                    <div className="card">
                    <SimpleCard key={community.communityID} label={community.name} />
                    </div>
                    </>
                )
            )}
        </div>
    );
}

export default Communities;
