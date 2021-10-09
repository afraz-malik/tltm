import React from "react";
import BFormsCss from "./BusinessForms.module.scss";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { gettingMutualFormStart } from "../../redux/data/data.action";
const BusinessForms = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const getForm = () => {
        dispatch(gettingMutualFormStart());
        history.push("/questions");
    };
    return (
        <div className={BFormsCss.container}>
            <div className={BFormsCss.card}>
                <div className={BFormsCss.imgTaker}>
                    <img alt="" src="images/bagpen.png" />
                </div>
                <div className={BFormsCss.text}>
                    <h3>LLC Bundle</h3>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Ornare pretium placerat ut platea. Purus blandit integer
                        sagittis massa vel est hac.
                    </p>
                </div>
                <div className={BFormsCss.links}>
                    <button onClick={() => getForm()}>Get Started</button>
                    <div className={BFormsCss.fees}>
                        $79 + state filing fees
                    </div>
                </div>
            </div>
            <div className={BFormsCss.card}>
                <div className={BFormsCss.imgTaker}>
                    <img alt="" src="images/bagpen.png" />
                </div>
                <div className={BFormsCss.text}>
                    <h3>LLC Bundle</h3>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Ornare pretium placerat ut platea. Purus blandit integer
                        sagittis massa vel est hac.
                    </p>
                </div>
                <div className={BFormsCss.links}>
                    <button onClick={() => getForm()}>Get Started</button>
                    <div className={BFormsCss.fees}>
                        $79 + state filing fees
                    </div>
                </div>
            </div>
            <div className={BFormsCss.card}>
                <div className={BFormsCss.imgTaker}>
                    <img alt="" src="images/bagpen.png" />
                </div>
                <div className={BFormsCss.text}>
                    <h3>LLC Bundle</h3>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Ornare pretium placerat ut platea. Purus blandit integer
                        sagittis massa vel est hac.
                    </p>
                </div>
                <div className={BFormsCss.links}>
                    <button onClick={() => getForm()}>Get Started</button>
                    <div className={BFormsCss.fees}>
                        $79 + state filing fees
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BusinessForms;