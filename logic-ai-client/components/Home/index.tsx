import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

     export default function HomeConponnet (){
return (
    <>
         
     {/* 5. Subjects List */}
      {/* <Text style={styles.header}>Prepare by Subject</Text> */}
      {/* {subjects.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.cardWrapper}
          onPress={() =>
            router.push({
              pathname: "/quiz/subtopics",
              params: { subject: item.id },
            })
          }
        >
          <View style={[styles.card, { backgroundColor: item.colors[0] }]}>
            <View style={styles.cardContent}>
              <View
                style={[styles.iconBox, { backgroundColor: item.colors[1] }]}
              >
                <Ionicons
                  name={item.icon as any}
                  size={28}
                  color={item.accent}
                />
              </View>
              <View style={styles.textDetails}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardSubText}>{item.subtitle}</Text>
              </View>
              <View
                style={[styles.arrowCircle, { backgroundColor: item.accent }]}
              >
                <Ionicons name="chevron-forward" size={18} color="#FFF" />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))} */}    
        {/* <Text style={[styles.header, { marginTop: 20 }]}>Accuracy Momentum</Text>
            <View style={styles.momentumCard}>
              <View style={styles.chartHeader}>
                <Text style={styles.chartSub}>Last 5 Mock Attempts</Text>
                <View style={styles.liveBadge}>
                  <View style={styles.liveDot} />
                  <Text style={styles.liveText}>LIVE INDEX</Text>
                </View>
              </View>
      
              <View style={styles.barChartContainer}>
                {data.attempts.map((val, i) => {
                  const prevVal = i > 0 ? data.attempts[i - 1] : val;
                  const diff = val - prevVal;
                  return (
                    <View key={i} style={styles.barCol}>
        
                      {i > 0 && (
                        <Text
                          style={[
                            styles.varianceText,
                            { color: diff >= 0 ? "#4CAF50" : "#FF5252" },
                          ]}
                        >
                          {diff >= 0 ? `+${diff}%` : `${diff}%`}
                        </Text>
                      )}
                      <View
                        style={[styles.thickBar, { height: (val / 100) * 120 }]}
                      />
                      <Text style={styles.barLabel}>A{i + 1}</Text>
                    </View>
                  );
                })}
              </View>
            </View> */}


    </>
)
     }
     
     
