import * as React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

export default class american extends React.Component {
  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <View style={styles.author}>
          
          <View style={styles.meta}>
            <Text style={styles.name}>Knowledge Bot</Text>
            <Text style={styles.timestamp}>1st Jan 2025</Text>
          </View>
        </View>
        <Text style={styles.title}>Lorem Ipsum</Text>
        <Text style={styles.paragraph}>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical Latin literature from 45 BC, making
          it over 2000 years old.
        </Text>
        
        <Text style={styles.paragraph}>
          Richard McClintock, a Latin professor at Hampden-Sydney College in
          Virginia, looked up one of the more obscure Latin words, consectetur,
          from a Lorem Ipsum passage, and going through the cites of the word in
          classical literature, discovered the undoubtable source.
        </Text>
        <Text style={styles.paragraph}>
          Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of &quot;de
          Finibus Bonorum et Malorum&quot; (The Extremes of Good and Evil) by
          Cicero, written in 45 BC. This book is a treatise on the theory of
          ethics, very popular during the Renaissance. The first line of Lorem
          Ipsum, &quot;Lorem ipsum dolor sit amet..&quot;, comes from a line in
          section 1.10.32.
        </Text>
      </ScrollView>
    );
  }
}
