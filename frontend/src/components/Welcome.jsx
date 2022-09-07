import React from 'react'

export default function Welcome(username) {
  return (
    <div>
      <Container>
        <h1>
          Welcome, <span>{username}</span>
        </h1>
        <h3>Please select a contact to start messaging</h3>
      </Container>
      Welcome
    </div>
    
  )
}
