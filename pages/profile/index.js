import React, { useState, useEffect } from 'react'
import digitalaxApi from 'services/digitalaxApi.service'
import UserInfo from '@components/user-profile/user-info'
import DigitalChangingRoom from '@components/user-profile/digital-changing-room'
import LoadingDots from '@components/ui/LoadingDots'
import { Layout } from '@components/common'
import { useMain } from 'context'


import styles from './styles.module.scss'

const UserProfile = () => {
  const [isInitLoading, setIsInitLoading] = useState(true)
  const [loveCount, setLoveCount] = useState(0)
  const [viewCount, setViewCount] = useState(0)

  const { user } = useMain()
  const account = user?.wallet

  const secretKey = user ? user.randomString : null

  const fetchViews = async () => {
    const viewData = await digitalaxApi.getViews('profile', account)
    setLoveCount(viewData && viewData[0] && viewData[0].loves ? viewData[0].loves.length : 0)

    if (viewData && viewData[0] && viewData[0].viewCount) {
      setViewCount(viewData[0].viewCount)
    }

    await addViewCount()
  }

  const addViewCount = async () => {
    const data = await digitalaxApi.addView('profile', account)
    if (data) {
      setViewCount(data.viewCount)
    }
  }

  const addLove = async () => {
    const data = await digitalaxApi.addLove(account, secretKey, 'profile', account)
    if (data && data['success']) {
      setLoveCount(loveCount + 1)
    }
  }

  const onClickLove = (e) => {
    addLove()
  }

  useEffect(() => {
    const loadUsers = async () => {
      if (account) {
        fetchViews()
      }
      setIsInitLoading(false)
    }

    loadUsers()
  }, [account])

  if (!user || isInitLoading) {
    return (
      <div className={styles.wrapper}>
        <LoadingDots />
      </div>
    )
  }

  const onClickReturn = () => {
    window.history.back()
  }

  return (
    <div className={styles.wrapper}>
      <button className={styles.returnButton} onClick={onClickReturn}>
        RETURN
      </button>
      <UserInfo
        twitter={user.twitter}
        userName={user.username}
        userAvatar={user.avatar}
        viewCount={viewCount}
        loveCount={loveCount}
        onClickLove={onClickLove}
        myProfile={true}
      />

      {account && <DigitalChangingRoom className={styles.digitalChangingRoom} owner={account} />}
    </div>
  )
}

export default UserProfile

UserProfile.Layout = Layout
