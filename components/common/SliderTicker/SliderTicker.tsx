import React, { FunctionComponent } from 'react'
import Ticker from 'react-ticker'
import cn from 'classnames'
import s from './SliderTicker.module.scss'

type Props = {
  sliderList: string[]
}

const SliderTicker: React.FC<Props> = ({ sliderList }) => {
  return (
    <div className={s.container}>
      <Ticker>
        {({ index }) => (
          <>
            <div className={s.textLiner}>
              {sliderList.map((text) => (
                <div>
                  <h1 className={s.text}>{text}</h1>
                </div>
              ))}
            </div>
          </>
        )}
      </Ticker>
    </div>
  )
}

export default SliderTicker
