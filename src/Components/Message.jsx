import React from 'react'

export const Message = ({msg,bgColor}) => {
  
  let styles = {
    padding: '1rem',
    marginBottom: '1rem',
    textAling: 'center',
    backgroundColor: bgColor,
    color:"#fff",
    fontWeight: 'bold',
  }
  
  
    return (
    <div style={styles}>
       <p>{msg}</p> 
    </div>
  )
}
