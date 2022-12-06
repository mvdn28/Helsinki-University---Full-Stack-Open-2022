import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('5.13 - ', () => {
  const blog = {
    title: 'Test-title',
    author: 'Test-author'
  }

  const { container } = render(<Blog blog={blog} />)

  const def = container.querySelector('.blog-default')
  const clk = container.querySelector('.blog-clicked')
  expect(def).toHaveTextContent(
    `${blog.title} ${blog.author}`
  )
  expect(clk).toHaveStyle('display: none')
})

test('5.14- ', async() => {
    const blog = {
      title: 'Test-title',
      author: 'Test-author'
    }

    const mockHandler = jest.fn()
  
    const { container } =render(<Blog blog={blog} editBlog={mockHandler}/>)
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
  

    const clk = container.querySelector('.blog-clicked')
    expect(clk).toHaveStyle('display: block')
})

test('5.15 ', async() => {
    const blog = {
      title: 'Test-title',
      author: 'Test-author'
    }

    const mockHandler = jest.fn()
  
    render(<Blog blog={blog} editBlog={mockHandler}/>)
    const user = userEvent.setup()
    const button = screen.getByText('like')
    await user.click(button)
    await user.click(button)
  

    expect(mockHandler.mock.calls).toHaveLength(2)
})
