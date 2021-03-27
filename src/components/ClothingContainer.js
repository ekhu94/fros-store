import React, { useState, useEffect } from 'react'
import axios from 'axios'



export default function ClothingContainer({onView}) {

    const renderCard = () =>{
        return onView.map(card => {
            return (
            <div className='ui column card'>
                <div className='ui slide masked reveal image'>
                    <img src={card.front_URL} className='visible content'/>
                    <img src={card.back_URL} className='hidden content' />
                </div>
                <div className='content'>
                    {card.name}
                </div>
            </div>
            )
        })
    }
    return (
        <div className='ui four column grid'>
            <h1 className='ui column'>IDK what do I do?</h1>
            {renderCard()}
        </div>
    )
}
