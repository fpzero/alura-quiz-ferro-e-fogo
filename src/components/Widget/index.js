import styled from 'styled-components'

const Widget = styled.div`
  margin-top: 24px;
  margin-bottom: 24px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => {
    return theme.colors.mainBg;
  }};
  border-radius: 4px;
  overflow: hidden;

  h1, h2, h3 {
    font-size: 16px;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 0;
  }
  p {
    font-size: 14px;
    font-weight: 400;
    line-height: 1;
  }
`;

Widget.Header = styled.header`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 18px 32px;
  background-color: ${({ theme }) => theme.colors.primary};
  
  * {
    margin: 0;
  }
`;

Widget.Content = styled.div`
  padding: 24px 32px 32px 32px;
  & > *:first-child {
    margin-top: 0;
  }
  & > *:last-child {
    margin-bottom: 0;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  input[type="text"] {
    width: 100%;
    padding: 10px;
    margin:10px 0;
    background: transparent;
    border: 1px solid ${({ theme }) => theme.colors.secondary};
    border-radius: 5px;
  }
  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.colors.success};
    color: ${({ theme }) => theme.colors.contrastText};
    border-radius: 5px;
    margin:10px 0;
    border: 0;
    padding: 0.25em 0.75em;
    width: 100%;
    min-height: 40px;
  }
`;

export default Widget;