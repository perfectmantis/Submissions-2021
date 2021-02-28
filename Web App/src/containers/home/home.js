/**
 * Created by Admin on 12/28/2016.
 */
import React, { Component } from 'react'


// Components
import { Card, CardMedia } from 'material-ui/Card';

export default class Home extends Component {
    constructor() {
        super();
    }

    render() {
        const mainMenu = (
            <Card>
                <CardMedia>
                    <img style={{ height: "90vh" }} src="http://wallpapercave.com/wp/UemfOh9.jpg" />
                </CardMedia>
            </Card>
        )
        return (
            <div>
                {mainMenu}
            </div>
        )

    }
}
