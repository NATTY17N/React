import {LeftSideComponent} from "./sides/LeftSideComponent.tsx";
import {RightSideComponent} from "./sides/RightSideComponent.tsx";

export function FundraisingSection() {
    return (
        <div className="min-w-[990px] min-h-[680px] bg-white rounded-3xl flex my-4">
            <LeftSideComponent/>
            <RightSideComponent/>
        </div>
    );
}
