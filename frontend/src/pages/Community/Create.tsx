import { useEffect, useState } from "react";
import TagList from "../../components/CheckboxList";
import RelativeLocation from "../Orientation/Pages/RelativeLocation";
import { Image, Location } from "../../models/common";
import { subscribeToUserModelSubject } from "../../observers/userobserver";
import { User, generateProfileImg } from "../../models/usermodel";
import { Community } from "../../models/communitymodel";
import UploadWrapper from "../../components/UploadImage/UploadWrapper";
import { useNavigate } from "react-router";
import Repository from "../../repositories/repository";
import { firstValueFrom } from "rxjs";
import { topicsQuery } from "../../apiInterface/gqlOperations";

function CreateCommunity() {
    // TODO: Use a routine to create a new Community with default values 
    const [community, setCommunity] = useState<Community>(new Community({
        _id: undefined,
        name: "",
        description: "",
        images: [
            generateProfileImg()
        ],
        location: null,
        members: null,
        tags: [],
    }));
    const [user, setUser] = useState<User | undefined>(undefined);
    let navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = subscribeToUserModelSubject((user: User) => {
            setUser(user);

            // Add current user as the first member of the community
            setCommunity(prev => new Community({_id: undefined, ...prev, members: [{type: "obj", objValue: user!}], location: user.location ?? null}));
        });
        return () => {
            unsubscribe.then(cleanup => cleanup && cleanup());
        }
    }, [setUser]);

    // TODO: create one parametric (template) to handle all updates indiscriminately 
    const handleSimpleChange = (event: any) => {
        const { name, value } = event.target;
        setCommunity((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    async function onSubmit(e: any) {
        e.preventDefault();
        try {
            const repo = Repository.getInstance('Community', Community);
            await firstValueFrom(repo.fetch(community));
            // TODO: Display success message to the user
            navigate('/');
        } catch(error) {
            // TODO: Report errors to user
            console.error(error);
        }
    }

    if(user) {
        return (
            <>
                <form id="community-form" onSubmit={onSubmit}>
                    <label htmlFor="name">Name:</label>
                    <input id="name" name="name" type="text" value={community.name!} onChange={handleSimpleChange} />
        
                    <label htmlFor="description">Description:</label>
                    <input id="description" name="description" type="text" value={community.description!} onChange={handleSimpleChange} />
        
                    <TagList setFuncs={[setSelectedTags]} checkedData={new Set<string>(community.tags)} query={topicsQuery} />
        
                    <RelativeLocation user={user} updateData={setSelectedLocation} />
                </form>

                {/* Uploady component is outside of the form to prevent it from triggering the form's submit event on use */}
                <UploadWrapper
                    images={community.images}
                    updateData={setImages}
                    multiUpload={true}
                    generateImgCb={generateProfileImg}
                />

                {/* TODO: disable submit button when input data is invalid */}
                <button type="submit" form="community-form">submit</button>
            </>
        );
    } else {
        return null;
    }
}

export default CreateCommunity;
