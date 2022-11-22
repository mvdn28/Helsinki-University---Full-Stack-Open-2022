import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('5.17', async() => {
  const blog = {
    title: 'Test-title',
    author: 'Test-author',
    url:'Test-url'
  }

  const mockHandler = jest.fn()
  const user = userEvent.setup()

  const { container } = render(<BlogForm createBlog={mockHandler} />)

  const inputTitle = container.querySelector('#form-title')
  const inputAuthor = container.querySelector('#form-author')
  const inputUrl = container.querySelector('#form-url')
  const createButton = screen.getByText('create')
  
  await user.type(inputTitle, blog.title)
  await user.type(inputAuthor, blog.author)
  await user.type(inputUrl, blog.url)
  await user.click(createButton)

  screen.debug()
  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0]["title"]).toBe('Test-title')
  expect(mockHandler.mock.calls[0][0]["author"]).toBe('Test-author')
  expect(mockHandler.mock.calls[0][0]["url"]).toBe('Test-url')
})