import {FundraisingSection} from "./components/FundraisingSection.tsx";
import {Footer} from "./components/Footer.tsx";
import {BalanceProps} from "./models/models.ts";


function App() {
    const initBalanceProps: BalanceProps = {
        collected: 0,
        goal: 32000
    }

    localStorage.setItem('balance', JSON.stringify(initBalanceProps));
    return (
        <div
            className="bg-gradient-to-br from-firstBodyGradientCol to-secondBodyGradientCol h-screen w-screen flex flex-col justify-center items-center">
            <FundraisingSection/>
            <Footer/>
        </div>
    )
}

export default App
