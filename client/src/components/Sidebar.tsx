import myPhoto from '../assets/me.png';

function Sidebar(){
    return(
        <div className="bg-gray-50 p-4 rounded shadow">
            <img
                src={myPhoto}
                alt="Xiaowei"
                className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-gray-300"
            />
            <p className="text-lg font-semibold mb-2">👩‍💻 About me</p>
            <p className="text-sm text-gray-700">Hi! I'm kaya, a software developer in training, so nice to meet you!</p>
        </div>
    )
}

export default Sidebar;