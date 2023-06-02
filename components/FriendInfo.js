import Avatar from "./Avatar";

export default function FriendInfo() {
    return (
        <div className="flex gap-2 ">
            <Avatar />
            <div>
                <h3 className="font-bold text-xl">Sinem I.</h3>
                <div className="text-sm leading-3">5 mutual friend</div>
            </div>
        </div>
    )
}