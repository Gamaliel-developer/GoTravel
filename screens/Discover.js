import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity, ActivityIndicator} from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Attractions, Avatar, Hotels, NotFound, Restaurants } from '../assets';
import MenuContainer from '../components/MenuContainer';
import { FontAwesome } from '@expo/vector-icons';
import ItemCardContainer from '../components/ItemCardContainer';
import { getPlacesData } from '../api';

const Discover = () => {
    const navigation = useNavigation();
    const [type, setType] = useState("restaurants");
    const [isLoading, setIsLoading] = useState(false);
    const [mainData, setMainData] = useState([]);
    const [bl_lat, setBl_lat] = useState(null);
    const [bl_lng, setBl_lng] = useState(null);
    const [tr_lat, setTr_lat] = useState(null);
    const [tr_lng, setTr_lng] = useState(null);

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerShown : false
        });
    }, []);

    useEffect(() => {
        setIsLoading(true);
        getPlacesData(bl_lat, bl_lng, tr_lat, tr_lng, type).then(data => {
            setMainData(data);
            setInterval(() => {
                setIsLoading(false);
            }, 2000);
        });
    }, [bl_lat, bl_lng, tr_lat, tr_lng, type]);

  return (
    <SafeAreaView className="flex-1 bg-white relative">
        <View className="flex-row items-center justify-between px-8 mt-7">
            <View>
                <Text className="text-[40px] text-[#0B649B] font-bold">Discover</Text>
                <Text className="text-[#3C6072] text-[32px]">The beauty today</Text>
            </View>
            <View className="w-12 h-12 bg-gray-400 rounded-md items-center justify-center shadow-lg">
                <Image source={Avatar} className="w-full h-full rounded-md object-cover"/>
            </View>
        </View>

        <View className="flex-row items-center bg-white mx-4 rounded-xl py-1 px-4 shadow-xl mt-4">
            <GooglePlacesAutocomplete
            GooglePlacesDetailsQuery={{ fields: "geometry" }}
            placeholder='Search'
            fetchDetails={true}
            onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                console.log(details?.geometry?.viewport);
                setBl_lat(details?.geometry?.viewport?.southwest?.lat)
                setBl_lng(details?.geometry?.viewport?.southwest?.lng)
                setTr_lat(details?.geometry?.viewport?.northeast?.lat)
                setTr_lng(details?.geometry?.viewport?.northeast?.lng)
            }}
            query={{
                key: 'AIzaSyBk1O1Q1axkLoL4ENQecybaKYXeydLCQlA',
                language: 'en',
            }}
            />
        </View>
        {/* Menu */}
        {isLoading ? <View className="flex-1 items-center justify-center">
            <ActivityIndicator size={'large'} color="#0B646B"/>
        </View> : 
        <ScrollView>
            <View className="flex-row items-center justify-between px-2 mt-8">
                <MenuContainer
                key={"hotels"}
                title="Hotels"
                imageSrc = {Hotels}
                type={type}
                setType={setType}
                />
                <MenuContainer
                key={"attractions"}
                title="Attractions"
                imageSrc = {Attractions}
                type={type}
                setType={setType}
                />
                <MenuContainer
                key={"restaurants"}
                title="Restaurants"
                imageSrc = {Restaurants}
                type={type}
                setType={setType}
                />
            </View>

            <View>
                <View className="flex-row items-center justify-between px-4 mt-8">
                    <Text className="text-[#3C6072] text-[28px] font-bold">Top Tips</Text>
                    <TouchableOpacity className="flex-row items-center justify-center space-x-2">
                        <Text className="text-[#A0C4C7] text-[20px] font-bold">Explore</Text>
                        <FontAwesome name="long-arrow-right" size={24} color="#A0C4C7"/>
                    </TouchableOpacity>
                </View>
                <View className="px-2 mt-4 flex-row items-center justify-evenly flex-wrap">
                    {mainData?.length > 0 ? (
                    <>
                        {mainData?.map((data, i) =>(
                            <ItemCardContainer 
                            key={i} 
                            imageSrc={
                                data?.photo?.images?.medium?.url ?
                                data?.photo?.images?.medium?.url :
                                "https://dbdzm869oupei.cloudfront.net/img/sticker/preview/5283.png"
                            } 
                            title={data?.name} 
                            location={data?.location_string}
                            data={data}
                            />
                        ))}
                    </>
                    ) : (
                    <>
                        <View className="w-full h-[350px] items-center justify-center space-y-8">
                            <Image 
                            source={NotFound} 
                            className="w-32 h-32 object-cover"
                            />
                            <Text className="text-2xl text-[#428288] font-semibold">
                                Ops... No Data Found
                            </Text>
                        </View>
                    </>
                    )}
                </View>
            </View>
        </ScrollView>
        }
    </SafeAreaView>
  );
}

export default Discover