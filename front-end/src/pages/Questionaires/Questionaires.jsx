import React from "react";
import Form1 from "../../components/QuestionairesForm/Form1";
import Form2 from "../../components/QuestionairesForm/Form2";
import Form3 from "../../components/QuestionairesForm/Form3";
import Form4 from "../../components/QuestionairesForm/Form4";
import HardCopy from "../../components/QuestionairesForm/HardCopy";
import QCss from "./Questionaires.module.scss";
import Logo from "../../components/NavBar/Logo";

import { useSelector } from "react-redux";
import { mutualFormSelector } from "../../redux/data/data.selector";
import { InsideSpinner } from "../../components/Spinner/Spinner";

const Questionaires = () => {
    const mutualForm = useSelector((state) => mutualFormSelector(state));
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [mutualForm]);
    const [state, setstate] = React.useState({ value: 25 });
    const handleForm = (data) => {
        if (state.value < 100) {
            setstate({ ...state, ...data, value: state.value + 25 });
        } else {
            setstate({ ...state, ...data });
        }
        console.log(state);
    };
    // var str= document.getElementsByClassName('company1address')[0].innerHTML;
    // str= str.replace(str, '<b>Shadbagh</b>')
    return (
        <div className={QCss.container}>
            <div className={QCss.container2}>
                <Logo />
                <div className={QCss.progress_bar}>
                    <div
                        className={QCss.progress_complete}
                        style={{ width: `${state.value}%` }}
                    ></div>
                </div>
                <div className={QCss.progress_percent}>
                    {" "}
                    {state.value}% Complete
                </div>
                <div className={QCss.body}>
                    <div className={QCss.form}>
                        {state.value === 25 ? (
                            <Form1 handleForm={handleForm} />
                        ) : null}
                        {state.value === 50 ? (
                            <Form2 handleForm={handleForm} />
                        ) : null}
                        {state.value === 75 ? (
                            <Form3 handleForm={handleForm} />
                        ) : null}
                        {state.value === 100 ? (
                            <Form4 handleForm={handleForm} />
                        ) : null}
                    </div>
                    <div
                        className={QCss.hardCopy}
                        style={{ backgroundImage: "url(images/TLTM.png)" }}
                    >
                        <div className={QCss.content}>
                            {mutualForm ? (
                                <HardCopy mutualForm={mutualForm} />
                            ) : (
                                <InsideSpinner />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <img alt="" className={QCss.jellyimg} src="images/jelly.png" />
        </div>
    );
};

export default Questionaires;
