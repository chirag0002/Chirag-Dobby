import { Quote } from "../components/Quote"
import { FormSignin } from "../components/SignInForm"


const Signup = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2">
            <div>
                <FormSignin />
            </div>

            <div className="invisible md:visible">
                <Quote />
            </div>
        </div>
    )
}

export default Signup