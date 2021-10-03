import React from 'react'
import { useSelector } from 'react-redux'

import { subsctiptionsSelector } from '../../redux/data/data.selector'
import PPCardsCss from './PaymentPlanCards.module.scss'

const PaymentPlanCards = ({ handleSubmit }) => {
  const plans = useSelector((state) => subsctiptionsSelector(state))
  // const [state, setstate] = React.useState(2)
  // const setCard = (value) => {
  //   setstate(value)
  // }
  return (
    <>
      {plans ? (
        <div className={PPCardsCss.cards}>
          {plans.map((plan) => (
            <div className={`${PPCardsCss.card} `} key={plan.id}>
              <div className={PPCardsCss.top}>
                <div className={PPCardsCss.left}>
                  <h2>{plan.title}</h2>
                </div>
                <div className={PPCardsCss.right}>
                  <h2>${plan.membership_cost}</h2>
                  <span>Membership</span>
                </div>
              </div>
              <div className={PPCardsCss.middle}>
                <h4>Plans Includes:</h4>
                <div className={PPCardsCss.point}>
                  <img alt="" src="images/tick.svg" />
                  <p>
                    {plan.no_of_documents === -1
                      ? 'Unlimited'
                      : plan.no_of_documents}{' '}
                    numbers of Documents.
                  </p>
                </div>
                <div className={PPCardsCss.point}>
                  <img alt="" src="images/tick.svg" />
                  <p>
                    {plan.add_on
                      ? 'You can to purchase separate add-on'
                      : 'Unlimited consulting sessions per month'}
                  </p>
                </div>
                <div className={PPCardsCss.point}>
                  <img alt="" src="images/tick.svg" />
                  <p>{plan.membership_description}</p>
                </div>
              </div>
              <div className={PPCardsCss.button}>
                <button onClick={() => handleSubmit(plan.id)}>
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </>
  )
}

export default PaymentPlanCards
