import React from 'react'
import {Link} from 'react-router-dom'



export default function ClothingContainer({cloth, onView}) {

    let clothCards;
    let displayTitle;
    switch (onView) {
        case 'mens':
            clothCards = cloth.filter( card => card.mens)
            displayTitle = 'MENS'
            break;
        case 'womens':
            clothCards = cloth.filter( card => !card.mens)
            displayTitle = 'WOMENS'
            break;
        default:
            clothCards = cloth
            displayTitle = 'All APPAREL'
            break;
    }

    const renderCards = () =>{
        return clothCards.map(card => {
            return (
            <Link to={`/show/${card.id}`} className='ui column card' key={card.id}>
                <div className='ui slide masked reveal image'>
                    <img src={card.front_URL} alt={card.name} className='visible content'/>
                    <img src={card.back_URL} alt={card.name} className='hidden content' />
                </div>
                <div className='content'>
                    {card.name}
                </div>
            </Link>
            )
        })
    }

    return (
        <div className='ui four column grid'>
            <h1 className='ui column'>{displayTitle}</h1>
            {renderCards()}
        </div>
    )
}
