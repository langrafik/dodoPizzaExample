/* eslint-disable prettier/prettier */
import React, { useState, useRef, useCallback, useEffect } from 'react'
import { FlatList, Dimensions } from 'react-native'
import Slider from './Slider'

import PropTypes from 'prop-types';

const Carousel = ({ data, invertImage = false, onIndexChange }) => {
    const [index, setIndex] = useState(0)
    const indexRef = useRef(index)
    indexRef.current = index

    const onScroll = useCallback((event) => {
        const slideSize = event.nativeEvent.layoutMeasurement.height
        const index = event.nativeEvent.contentOffset.y / slideSize
        const roundIndex = Math.round(index)

        const distance = Math.abs(roundIndex - index)

        // Prevent one pixel triggering setIndex in the middle
        // of the transition. With this we have to scroll a bit
        // more to trigger the index change.
        const isNoMansLand = distance > 0.4

        if (roundIndex !== indexRef.current && !isNoMansLand) {
            setIndex(roundIndex)
        }
    }, [])

    // Use the index
    useEffect(() => {
        onIndexChange(index, data[index]);
    }, [index, data])

    return (
        <FlatList
            data={data}
            style={{ flex: 1 }}
            renderItem={({ item }) => {
                return <Slider data={item} invertImage={invertImage} />
            }}
            pagingEnabled
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            onScroll={onScroll}
            keyExtractor={(item) => item.title}
        />
    )
}

Carousel.propTypes = {
    data: PropTypes.array.isRequired,
    onIndexChange: PropTypes.func.isRequired,
    invertImage: PropTypes.bool
}


export default Carousel
