import { SafeAreaView } from 'react-native-safe-area-context';
import { stores } from '../src/data/stores';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

export default function Home({ navigation }: any) {

    const enterStore = () => {
        // Login sem conta - vai direto para Home
        navigation.navigate('Store', stores);
    };

    return (

        <SafeAreaView style={styles.container}>

            <Image source={require('../assets/bannerHome.png')}
                style={styles.banner}
            />

            <View style={styles.containerCards}>
                {stores.map((store) => (
                    <TouchableOpacity
                        key={store.id}
                        style={[styles.card, { backgroundColor: store.color }]}
                        onPress={() => navigation.navigate('Store', { store })}>

                        <Image
                            source={store.image}
                            style={styles.image}
                        />

                        <Text style={styles.name}>
                            {store.name}
                        </Text>

                    </TouchableOpacity>
                ))}
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },

    // banner
    banner: {
        width: '100%',
        height: 190,
        resizeMode: 'cover',
        borderRadius: 20
    },

    // container cards
    containerCards: {
        paddingTop: 25,
        maxWidth: '100%'
    },

    card: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10
    },

    image: {
        width: 50,
        height: 50,
        marginRight: 10,
        borderRadius: 5
    },

    name: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});