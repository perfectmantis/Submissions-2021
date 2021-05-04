import React, {Component} from 'react';;
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, FlatList, Platform, ActivityIndicator } from 'react-native';
// import GenericToolbarView from '../../components/generic_toolbar';
// import globals from '../../utils/globals';
// import ParallaxScrollView from 'react-native-parallax-scroll-view';
import Image from 'react-native-image-progress';
// import Progress from 'react-native-progress';

export default class NewsCatalogView extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            newsData: []
        }

        this.fetchNews(1)
        console.warn('ssss')
    }

    static navigationOptions = {
        title: "News",
        header: null,
        // headerStyle: {marginTop: (Platform.OS === 'ios') ? 0 : StatusBar.currentHeight}
    };

    fetchNews(page){
        var mainUrl = `https://newsapi.org/v2/top-headlines?sources=crypto-coins-news&page=`+page+`&pageSize=10&apiKey=03e91efe53924bceb2ee9fdf84b1a136`;
        //var mainUrl = "http://eventregistry.org/json/article?query=%7B%22%24query%22%3A%7B%22%24and%22%3A%5B%7B%22conceptUri%22%3A%7B%22%24and%22%3A%5B%22http%3A%2F%2Fen.wikipedia.org%2Fwiki%2FCryptocurrency%22%5D%7D%7D%2C%7B%22lang%22%3A%22eng%22%7D%5D%7D%7D&action=getArticles&resultType=articles&articlesSortBy=date&articlesCount=10&articlesIncludeArticleImage=true&articlesArticleBodyLen=-1&articlesPage="+page+"&apiKey=98b59e30-510c-4365-8daf-2cad797478fc"
        fetch(mainUrl, {
            timeout: 30 * 1000,
            method: 'GET',
            dataType: 'json',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then((responseText) => responseText.json())
        .then((response) => {
            this.setState({newsData: response.articles})
          })
    }

    render(){
        return(

            <View style={{flex: 1, backgroundColor:'white', marginTop: (Platform.OS === 'ios') ? 0 : StatusBar.currentHeight}}>
                <StatusBar
                    backgroundColor={'white'}
                    barStyle='dark-content'
                />
                {/* <GenericToolbarView
                    showBack = {true}
                    backButton = {globals.BACK_ICON.ARROW}
                    navigation={this.props.navigation}
                    title = "News"
                    buttonRightText = ""
                /> */}

                <View style={{backgroundColor: 'white', flex: 1}}>
                    {(this.state.newsData && this.state.newsData.length > 0) ? 
                        <FlatList
                            data={this.state.newsData}
                            renderItem={({ item, index }) => 
                                <View
                                    style={{backgroundColor: 'white', padding: 10}}
                                >
                                    <TouchableOpacity
                                        style={{backgroundColor: 'white'}}
                                        onPress = {() => {
                                            this.props.navigation.navigate("NewsArticleView", 
                                            {
                                                title: item.title,
                                                description: item.description,
                                                imageUrl: item.urlToImage
                                            });
                                        }}
                                    >
                                        <Image
                                            style={{width: '100%', height: 200}}
                                            source = {{uri: item.urlToImage}}
                                            indicator={<ActivityIndicator size="small" color={"#20E2F1"} />}
                                        />
                                        <View style={localStyles.titleContainer}>
                                            <Text style={localStyles.titleText}>{item.title}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            }
                        /> :
                        <ActivityIndicator style={{alignSelf: 'center', flex: 1}} size="large" color={"#20E2F1"} />
                    }
                </View>
            </View>
        )
    }
}

const localStyles = StyleSheet.create({
    bodyText: {
        fontSize: 14,
        fontWeight: '100',
        color: 'black',
        textAlign: 'justify'
    },
    titleText:{
        fontSize: 18,
        fontWeight: '500',
        color: 'black',
        paddingTop: 7,
        paddingLeft: 10,
        paddingBottom: 7,
    },
    titleContainer:{
        top: 0,
        position: 'absolute',
        backgroundColor: '#ffffffc0',
        width: '100%',
    }
})