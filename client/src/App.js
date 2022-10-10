import './App.css'
import { useState } from 'react'
import instance from './request'

var i = -1
var prizesflowArray = [0, 2, 5, 8, 6, 3]
function App() {
  //动画中的背景色存放在这个对象中
  const [par, setPar] = useState({})
  //弹窗显示与否
  const [isPopupShow, setIsPopupshow] = useState(false)
  //中奖信息
  const [info, setInfo] = useState('')
  //正在进行中就锁上
  const [lock, setLock] = useState(false)

  //点击开始抽奖
  const prizesStart = async () => {
    if (lock) return
    setLock(true)
    const data = await instance.get('http://localhost:9999/lucky')
    console.log(data)
    console.log(data.data.prodCode)
    if (data.data.prodCode == 6) {
      setInfo('谢谢惠顾！')
      setIsPopupshow(true)
      setLock(false)
      return
    }
    let lotteryIndex = filterIndex(String(data.data.prodCode))
    console.log(lotteryIndex)
    lotteryAnimation(lotteryIndex)
  }

  // 下标过滤
  const filterIndex = (val) => {
    let keys = ''
    switch (val) {
      case '0':
        keys = 2
        setInfo('恭喜您，获得3元优惠券！')
        break
      case '1':
        keys = 3
        setInfo('恭喜您，获得5元优惠券！')
        break
      case '2':
        keys = 6
        setInfo('恭喜您，获得10元优惠券！')
        break
      case '3':
        keys = 5
        setInfo('恭喜您，获得20元优惠券！')
        break
      case '4':
        keys = 8
        setInfo('恭喜您，获得50元优惠券！')
        break
      case '5':
        keys = 0
        setInfo('恭喜您，获得100元优惠券！')
        break
      default:
    }
    return keys
  }

  // 抽奖动画
  const lotteryAnimation = (val) => {
    //抽奖动画
    var timer1 = setInterval(function () {
      animatedPrizesfind(false)
    }, 80)
    var timer2
    setTimeout(function () {
      clearInterval(timer1)
      timer2 = setInterval(function () {
        animatedPrizesfind(false)
      }, 30)
    }, 500)
    var timer3
    setTimeout(function () {
      clearInterval(timer2)
      timer3 = setInterval(function () {
        animatedPrizesfind(false)
      }, 100)
    }, 2000)
    var timer4
    setTimeout(function () {
      clearInterval(timer3)
      timer4 = setInterval(function () {
        animatedPrizesfind(false)
      }, 300)
    }, 4000)
    var timer5
    setTimeout(function () {
      clearInterval(timer4)
      timer5 = setInterval(function () {
        animatedPrizesfind(true, function (e) {
          if (e === val) {
            clearInterval(timer5)
            setTimeout(function () {
              setIsPopupshow(true)
              setLock(false)
            }, 500)
          }
        })
      }, 500)
    }, 5000)
  }

  // 九宫格抽奖 css变化
  const animatedPrizesfind = (isFindPrizes, callback) => {
    var lastprizesIndex
    if (i === -1) {
      lastprizesIndex = prizesflowArray[prizesflowArray.length - 1]
    } else {
      lastprizesIndex = prizesflowArray[i]
    }

    i++
    var prizesIndex = prizesflowArray[i]
    var par = {}
    par['prizesborderW' + prizesIndex] = '#fff7db'
    var indexArr = [3, 5, 7]
    if (indexArr.indexOf(lastprizesIndex) !== -1) {
      par['prizesborderW' + lastprizesIndex] = '#ffc570'
    } else {
      par['prizesborderW' + lastprizesIndex] = '#ffdf9a'
    }
    setPar(par)
    if (i === prizesflowArray.length - 1) {
      i = -1
    }
    if (isFindPrizes) {
      callback(prizesIndex)
    }
  }

  return (
    <div className="App">
      <div className="prizesContainer">
        <div className="bgc1 first prizesCell" style={{ backgroundColor: par.prizesborderW0 }}>
          100元优惠券
        </div>
        <div className="bgc1 prizesCell" style={{ backgroundColor: par.prizesborderW2 }}>
          3元优惠券
        </div>
        <div className="bgc2 prizesCell" style={{ backgroundColor: par.prizesborderW3 }}>
          5元优惠券
        </div>
        <div className="prizesCell btn" onClick={prizesStart}>
          开始
        </div>
        <div className="bgc2 prizesCell" style={{ backgroundColor: par.prizesborderW5 }}>
          20元优惠券
        </div>
        <div className="bgc1 prizesCell" style={{ backgroundColor: par.prizesborderW6 }}>
          10元优惠券
        </div>
        <div className="bgc1 last prizesCell" style={{ backgroundColor: par.prizesborderW8 }}>
          50元优惠券
        </div>
      </div>

      {isPopupShow ? (
        <div className="mask">
          <div className="mask-popup">
            {info}
            <button
              className="mask-popup-closeBtn"
              onClick={() => {
                setIsPopupshow(false)
              }}>
              关闭
            </button>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default App
