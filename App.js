import React, { useMemo, useRef, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function App() {
  /**
   * @type {React.MutableRefObject<WebView | null>}
   */
  const webViewRef = useRef(null);
  const [time, setTime] = useState([0, 0]);

  const handleReloadButtonClick = () => {
    const wv = webViewRef.current;
    if(wv !== null) {
      wv.clearCache && wv.clearCache(true);
      wv.reload();
      setTime([0, 0]);
    }
  }

  const loadingTime = useMemo(() => {
    if(time[0] === 0 || time[1] === 0) {
      return 0;
    }
    const ret = time[1] - time[0]
    return isNaN(ret) ? 0 : ret;
  }, [time]);
  
  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        style={styles.webview}
        source={{ 
          uri: 'https://google.com',
          headers: {'Cache-Control': 'no-cache'}
        }}
        cacheEnabled={false}
        onLoadStart={() => {
          setTime([Date.now()]);
        }}
        onLoadEnd={() => {
          setTime([time[0], Date.now()]);
        }}
      />
      <View style={styles.button}>
        {loadingTime > 0 ? <Text>Loading time: {loadingTime}ms</Text> : <Text>Loading...</Text>}
        <Button 
          title="Reload" 
          onPress={handleReloadButtonClick} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: '#fff',
  },
  webview: {
    flex: 1
  },
  button: {
    padding: 24,
    marginBottom: 200
  }
});
