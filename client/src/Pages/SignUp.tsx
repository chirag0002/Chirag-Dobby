import { Quote } from "../components/Quote"
import { FormSignup } from "../components/SignUpForm"


const Signup = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2">
            <div>
                <FormSignup />
            </div>
            <div className="invisible md:visible">
                <Quote />
            </div>
        </div>
    )
}

export default Signup