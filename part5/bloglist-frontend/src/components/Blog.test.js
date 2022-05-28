import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
    let container

    const blogProps = {
        title: 'test title',
        author: 'test author',
        url: 'testurl.com',
        likes: '10',
        name: 'test name',
        incLikes: jest.fn(),
        removeBlog: jest.fn(),
        isRemovable: false
    }


    beforeEach(() => {
        container = render(<Blog {...blogProps} />).container
    })

    test('only the author and title are rendered by default', () => {
        const mainDiv = container.querySelector('.blogStyle')      
        expect(mainDiv).toHaveTextContent('test title | test author')
        expect(mainDiv).not.toHaveTextContent('testurl.com')
        expect(mainDiv).not.toHaveTextContent('likes 10')
    })

    test('url and likes are rendered after the view button is clicked', async () => {
        const user = userEvent.setup()
        const viewButton = screen.getByText('view')
        await user.click(viewButton)
        const mainDiv = container.querySelector('.blogStyle')      
        expect(mainDiv).toHaveTextContent('test title | test author')
        expect(mainDiv).toHaveTextContent('testurl.com')
        expect(mainDiv).toHaveTextContent('likes 10')        
    })

    test('like button clicked twice means the event handler is called twice', async () => {
        const user = userEvent.setup()
        const viewButton = screen.getByText('view')
        await user.click(viewButton)
        const likeButton = screen.getByText('like')
        await user.click(likeButton)
        await user.click(likeButton)
        expect(blogProps.incLikes.mock.calls).toHaveLength(2)        
    })
})