import React, { useState } from "react";
import SimpleCard from "../../../components/SimpleCard/SimpleCard";

function Communities() {
    /*
    // TODO: Curate a short list of communities near the user, based on their interests
    const [communities, setCommunities] = useState(Community[]);
    
    useEffect(() {
        const subscribtion = communityCuratedObserver.subscribe(setCommunities)
        return () => {
            subscribtion.unsubscribe();
        }
    }, []);
    */
    
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
                        name: "Digital art",
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
            <h1>Check out these layers</h1>
            <p>Layers are small communities with like-minded people. You can participate in group activities and projects here.</p>

            {communities.map(
                (community) => (
                    <SimpleCard key={community.communityID} label={community.name} />
                )
            )}
        </div>
    );
}

export default Communities;
