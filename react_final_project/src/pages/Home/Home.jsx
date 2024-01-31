import { useAuthContext } from "../../context/auth/AuthContextProvider";
import { logOutAction } from "../../context/auth/actions";

const Home = () => {
    const {dispatch} = useAuthContext();
    return (
        <div className="home">
            <button onClick={() => {
                dispatch(logOutAction());
            }}>Log Out</button>
        </div>
    )
}

export default Home;