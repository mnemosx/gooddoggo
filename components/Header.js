import React from 'react'
import styled from 'styled-components' // https://docs.expo.dev/guides/using-styled-components/#considerations
import LogoSvg from './svg/LogoSvg'

const Title = styled.Text`
  font-size: 30px;
  margin-bottom: 30px;
  font-family: Acme;
  text-align: center;
  color: #c8a052;
`

const Header = () => {
  return (
    <>
      <LogoSvg width={100} height={140} />
      <Title>
        <Title style={{ color: '#ffc1c4' }}>good</Title>doggo
      </Title>
    </>
  )
}

export default Header
