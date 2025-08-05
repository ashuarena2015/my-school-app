import { FC } from 'react';

import { Image, StyleSheet, View } from 'react-native';
import AppText from '../AppText';

interface CardProps {
    title: string;
    content: string;
    image: string;
    customStyles: object;
    customStylesHeading1?: object;
    customStylesHeading2?: object;
    icon: React.ReactNode;
}

const Card: FC<CardProps> = ({ title, content, image, customStyles, customStylesHeading1, customStylesHeading2, icon }) => {

    const viewStyles = image ? { ...styles.card, ...customStyles, ...styles.card_flex } : { ...styles.card, ...customStyles };

    return (
        <View style={{ ...viewStyles }}>
            {image ? <Image
                source={{ uri: image }}
                width={100}
                height={100}
                style={{ ...styles.card_image }}
                resizeMode="cover"
                alt={title}
            /> : null}
            <View>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <View style={styles.icon_wrapper}>{icon}</View>                    
                    <AppText style={{...customStylesHeading2}}>{content}</AppText>
                    <AppText style={{...customStylesHeading1, marginLeft: 8 }}>{title}</AppText>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        // backgroundColor: '#fff',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 16,
        paddingLeft: 16,
        marginBottom: 16,
        shadowColor: '#999',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 5,
        gap: 8,
        justifyContent: 'center',
    },
    card_flex: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    card_image: {
        width: 100,
        height: 100,
        borderRadius: '50%',
        marginRight: 8,
    },
    icon_wrapper: {
        width: 32,
        height: 32,
        backgroundColor: '#FFF9E5',
        borderWidth: 1,
        borderColor: '#F2EDD1',
        borderRadius: 32,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
export default Card;
