import React from "react";
import toast from "cogo-toast";
import FormCss from "./Form.module.scss";
import { countryList } from "../../countryList";
const Form1 = ({ handleForm }) => {
    const [state, setstate] = React.useState("");
    const [toggle, settoggle] = React.useState(false);
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!state) {
            toast.warn("Enter Your State To Procceed");
        } else {
            handleForm({ agreement_construed_state: state });
        }
    };
    return (
        <div className={FormCss.form}>
            <form onSubmit={handleSubmit}>
                <h2>In what State would you like to form ________?</h2>
                <p>
                    For the purpose of industry regulation, your details are
                    required.
                </p>
                <label>Enter Your State </label>
                <div className={FormCss.dropdownbox}>
                    <div
                        className={FormCss.dropdown}
                        onClick={() => settoggle(!toggle)}
                    >
                        <h3>{state ? state : "Select Your State"}</h3>
                        <img alt="" src="images/downarrow.png" />
                    </div>
                    <div
                        className={FormCss.dd_content}
                        style={
                            toggle ? { display: "block" } : { display: "none" }
                        }
                    >
                        <ul>
                            {countryList.map((cl, j) => (
                                <li
                                    key={j}
                                    onClick={() => {
                                        setstate(cl);
                                        settoggle(false);
                                    }}
                                    className={
                                        state === cl ? FormCss.active : null
                                    }
                                >
                                    {cl}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <input type="submit" value="Continue" />
                <span>
                    {" "}
                    <img alt="" src="images/lock.png" />
                    Your info is savely secured
                </span>
            </form>
        </div>
    );
};

export default Form1;
