import React, { useState } from "react";
import Form1 from "../../components/QuestionairesForm/Form1";
import Form2 from "../../components/QuestionairesForm/Form2";
import Form3 from "../../components/QuestionairesForm/Form3";
import Form4 from "../../components/QuestionairesForm/Form4";
import HardCopy from "../../components/QuestionairesForm/HardCopy";
import QCss from "./Questionaires.module.scss";
import Logo from "../../components/NavBar/Logo";

import { useDispatch, useSelector } from "react-redux";
import { currentFormSelector } from "../../redux/data/data.selector";
import { InsideSpinner, Spinner } from "../../components/Spinner/Spinner";
import Preview from "../../components/Preview/Preview";
import { savingForm } from "../../redux/data/data.action";
import { currentUserSelector } from "../../redux/user/user.selector";
import { useHistory } from "react-router";
import NewForm from "../../components/QuestionairesForm/NewForm";

const Questionaires = () => {
    const currentForm = useSelector((state) => currentFormSelector(state));
    const currentUser = useSelector((state) => currentUserSelector(state));
    const history = useHistory();
    const dispatch = useDispatch();
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentForm]);
    const total_pages = currentForm.pages.length;
    const [state, setstate] = useState({
        value: 100 / total_pages,
        currentPage: 0,
    });
    const [toggle, settoggle] = useState(false);
    const handleForm = (data) => {
        if (state.value < 100) {
            setstate({
                ...state,
                ...data,
                value: state.value + 100 / total_pages,
                currentPage: state.currentPage + 1,
            });
        } else {
            setstate({ ...state, ...data });
        }
    };
    const submitForm = () => {
        dispatch(savingForm({ form: currentForm.form, state }));
        if (currentUser) {
            history.push("/plans");
        } else {
            history.push({ pathname: "/register", form: true });
        }
    };
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
                        <NewForm
                            newForm={currentForm.pages[state.currentPage]}
                            handleForm={handleForm}
                            lastPage={
                                state.currentPage === total_pages ? true : false
                            }
                        />
                    </div>
                    <div
                        className={QCss.hardCopy}
                        style={{
                            backgroundImage: "url(images/TLTM.png)",
                        }}
                    >
                        <div className={QCss.content}>
                            <HardCopy currentForm={currentForm.form} />
                        </div>
                    </div>
                </div>
            </div>
            <img alt="" className={QCss.jellyimg} src="images/jelly.png" />
            {toggle ? (
                <Preview position="fixed">
                    <div
                        className={`${QCss.hc} preview`}
                        style={{
                            backgroundImage: "url(images/TLTM.png)",
                        }}
                    >
                        <img
                            className={QCss.hcimg}
                            alt=""
                            src="images/x-circle.png"
                            onClick={() => settoggle(false)}
                        />
                        <HardCopy
                            currentForm={currentForm.form}
                            state={state}
                        />
                    </div>
                </Preview>
            ) : null}
        </div>
    );
};

export default Questionaires;
