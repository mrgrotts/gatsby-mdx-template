import styled from 'styled-components'

export const Main = styled.main.attrs(props => ({
  role: 'main'
}))`
  margin: 0;
  padding: 0;
  position: relative;
  overflow-wrap: break-word;
`
