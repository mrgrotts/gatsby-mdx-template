import styled from 'styled-components'

export const Nav = styled.nav.attrs(props => ({
  role: 'menu'
}))`
  align-items: center;
  display: flex;
  height: 5rem;
  justify-content: space-between;
  white-space: nowrap;
  z-index: 1;
`
