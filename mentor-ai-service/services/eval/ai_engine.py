def generate_cognitive_profile(
    topic_id: str, 
    accuracy: float, 
    total_time: int, 
    total_questions: int, 
    metrics: dict
) -> dict:
    """
    Synthesizes tracking analytics to construct structured diagnostic evaluation metrics.
    """
    topic_map = {"1": "Quantitative Analysis", "2": "Logical Reasoning", "3": "Verbal Ability"}
    subject_name = topic_map.get(topic_id, "General Intelligence")

    if accuracy >= 80:
        profile = "Demonstrates superior conceptual accuracy and deep algorithmic problem-solving fluidity."
        focus = f"Advance to tier-3 complex multi-variable {subject_name} challenge modules."
    elif accuracy >= 50:
        profile = "Strong foundational mechanics with occasional structural performance gaps when processing pacing matrices."
        focus = f"Target systematic pacing exercises within intermediate {subject_name} topics."
    else:
        profile = "Significant cognitive friction observed across core parameters. High vulnerability under test timer pressure."
        focus = f"Re-engage with fundamental concepts and basic step-by-step derivation breakdowns."

    if metrics["guesses"] > (total_questions * 0.3):
        profile += " High rate of impulsive guessing detected under uncertainty bounds."
        focus = "Focus heavily on eliminating split-second guessing patterns; focus on step-by-step derivation deductions."
    
    if metrics["correct_but_slow"] > (total_questions * 0.4):
        profile += " Displays severe temporal bottleneck drag constraints despite checking accurate solutions."
        focus = f"Prioritize mental calculation shortcuts and elimination frameworks within {subject_name} to shave down processing times."

    avg_pace = round(total_time / total_questions, 1) if total_questions > 0 else 0
    pace_rating = "Aggressive Pacing" if avg_pace < 15 else "Balanced/Steady" if avg_pace <= 30 else "Delayed/Deliberate"

    return {
        "cognitive_profile": profile,
        "speed_rating": f"{pace_rating}",
        "recommended_focus": focus
    }