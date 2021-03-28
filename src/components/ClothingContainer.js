import React from 'react'
import {Link} from 'react-router-dom'



export default function ClothingContainer({cloth, onView}) {

    let clothCards;
    switch (onView) {
        case 'mens':
            clothCards = cloth.filter( card => card.mens)
            break;
        case 'womens':
            clothCards = cloth.filter( card => !card.mens)
            break;
        default:
            clothCards = cloth
            break;
    }

    const renderCard = () =>{
        return clothCards.map(card => {
            return (
            <Link to={`/show/${card.id}`} className='ui column card'>
                <div className='ui slide masked reveal image'>
                    <img src={card.front_URL} className='visible content'/>
                    <img src={card.back_URL} className='hidden content' />
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
            <h1 className='ui column'>IDK what do I do?</h1>
            {renderCard()}
        </div>
    )
}