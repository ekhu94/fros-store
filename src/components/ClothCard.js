import React, { useState } from 'react'
import { Grid, Image, Button, Icon } from 'semantic-ui-react'

export default function ClothCard({cloth}) {

    const [front, setFront] = useState(true)

    return (
        <div>
            {console.log(cloth)}
        <h1>{cloth.name}</h1>
        <Grid relaxed columns={3}>
            <Grid.Column>
                <Image 
                    size='mini'
                    src={cloth.front_URL}
                    onClick={setFront(true)}
                />
                <Image
                    size='mini'
                    src={cloth.back_URL}
                    onClick={setFront(false)}
                />
            </Grid.Column>
            <Grid.Column>
                <Image 
                    size='big'
                    src={front ? cloth.front_URL : cloth.back_URL}
                />
            </Grid.Column>
            <Grid.Column>
                <Button icon labelPosition='right'>
                    Add to cart
                    <Icon name='cart plus'/>
                </Button>
                <Button icon labelPosition='right'>
                    Back
                    <Icon name='undo' />
                </Button>
            </Grid.Column>
        </Grid>
        </div>
    )
}
