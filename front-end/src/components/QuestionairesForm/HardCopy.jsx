import React from "react";
import FormCss from "./Form.module.scss";

import $ from "jquery";
const HardCopy = ({ mutualForm }) => {
    React.useEffect(() => {
        window.scrollTo(0, 0);
        var $log = $(".hardcopy"),
            html = $.parseHTML(mutualForm);
        $log.append(html);
    }, [mutualForm]);

    return <div className={`${FormCss.page} hardcopy`}>{}</div>;
};

export default HardCopy;
