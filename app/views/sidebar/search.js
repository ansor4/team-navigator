import veact from 'veact'
import { state, searchMembers } from '../../controllers'
import { type, grayRegular } from '../lib'
import { assign } from 'lodash'
import { readFileSync } from 'fs'
import path from 'path'

const artsyLogo = readFileSync(path.join(__dirname, './artsy-logo.svg'))
const view = veact()

const { div, a, input } = view.els()
const filteredNumOfEmployees = () => {
  let seen = new Set();
  for (var member of state.get('allMembers')) {
    if (member.title.includes('Contributor to The Art Genome Project')) {
      continue;
    }
    seen.add(member.email);
  }
  return seen.size;
}

view.styles({
  searchWrapper: {
    height: '70px',
    marginTop: '20px',
    borderBottom: `1px solid ${grayRegular}`
  },
  navItem: {
    height: '40px',
    width: '50px',
    float: 'left'

  },
  input: assign(
    type('garamond', 'body'),
    {
      width: '280px',
      height: '40px',
      border: `2px solid ${grayRegular}`,
      paddingLeft: '5px',
      outline: 'none',
      display: 'inline-block',
      float: 'right'
    }
  )
})

view.render(() =>
  div('.searchWrapper',
    a('.navItem', { href: `/`, dangerouslySetInnerHTML: { __html: artsyLogo } }),
    input('.input', {
      placeholder: `Search ${filteredNumOfEmployees()} team members`,
      onChange: (e) => searchMembers(e.target.value)
    })
  )
)

export default view()
