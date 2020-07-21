# STREAMLIT

# run web server via "streamlit run {filename}.py"
# http://localhost:8501/

import time
import numpy as np
import pandas as pd 
import matplotlib
import matplotlib.pyplot as plt
import seaborn as sns
import altair as alt
import plotly.figure_factory as ff

import streamlit as st

# DISPLAY  

# display text
st.title("Title")
st.header("Header")
st.subheader("Sub-header")
st.text("Regular Text")
st.markdown("**Markdown**")
st.latex("a + b x + c x^2 + d x^3")
st.error('This is an error')
st.warning('This is a warning')
st.info('This is a purely informational message')
st.success('This is a success message!')
my_placeholder = st.empty()
my_placeholder.text("Placeholder text")

# display any object
st.write('Hello, world!')
n = 1764 * 323 
st.write(n)
df = pd.DataFrame({'col1': [55,21,32], 
                   'col2': [14,45,6], 
                   'col3' : [87,8,91]})
st.write(df)
st.write("multiple arguments on 1 line:", n)

# display native figures
st.line_chart(df)
st.bar_chart(df.col1)

# display matplotlib figure
df = pd.DataFrame(np.random.randn(100,3), columns=['col1','col2','col3'])
figure_1 = plt.figure()
plt.title("matplotlib figure title 1")
plt.scatter(x=df.col1, y=df.col2, c=df.col3)
plt.close()
st.pyplot(figure_1)

# display matplotlib figure
figure_1b = plt.figure()
plt.hist(df.col1, bins=50, color='red')
plt.title("matplotlib figure title 2")
plt.close()
st.pyplot(figure_1b)

# display seaborn figure
figure_2 = sns.pairplot(df)
plt.close()
st.pyplot(figure_2)

# display altair figure 
figure_3 = alt.Chart(df).mark_circle().encode(
    x='col1', 
    y='col2', 
    size='col3', 
    color='col3', 
    tooltip=['col1', 'col2', 'col3']
    ).properties(
    title='altair figure title'
)
st.altair_chart(figure_3, use_container_width=True)

# display plotly figure
hist_data = [df.col1, df.col2, df.col3]
figure_4 = ff.create_distplot(hist_data, group_labels=['col1','col2','col3'])
st.plotly_chart(figure_4, use_container_width=True)

# displauy map
df_map = pd.DataFrame(
    np.random.randn(1000, 2) / [20, 20] + [38.9, -77.0],
    columns=['lat', 'lon'])
st.map(df_map)

# display pandas dataframe with formatting
st.dataframe(df.style.highlight_max(axis=1))
st.table(df.iloc[0:10])

# note: also can use st.image(), st.audio(), st.video()
# note: use st.echo() to display code 

# INTERACTIVE WIDGETS

# button widget
if st.button('Submit'):
    st.write('Do X')

# check box widget
checkbox = st.checkbox('I agree')
if checkbox:
    st.write('Do Y')

# radio button widget
radio_button = st.radio("What Letter?", ("A","B","C"))
if radio_button == "A":
    st.write("Do A")
elif radio_button == "B":
    st.write("Do B")
elif radio_button == "C":
    st.write("Do C")

# select box widget
column_selection = st.selectbox('Filter to:', ['col1', 'col2', 'col3'])
st.write(df[[column_selection]])

# slider widget 
x = st.slider(' x')
st.write(x, 'squared is', x * x)

# text input widget
title = st.text_input('Enter a Movie Title:', 'The Matrix')
st.write('The current movie title is ', title)

# number input widget
number = st.number_input('Enter a Number:')
st.write('The current number is ', number)

# file upload widget
uploaded_file = st.file_uploader("Choose a CSV file", type="csv")
if uploaded_file is not None:
    data = pd.read_csv(uploaded_file)
    st.write(data)

# note: also can use st.text_area(), st.date_input(), st.time_input(), st.multiselect,  etc.

# SIDEBAR

# add widgets to sidebar
sidebar_add_selectbox = st.sidebar.selectbox(
    "Sidebar Option?",
    ("1", "2", "3")
)
if sidebar_add_selectbox == "1":
    st.write("Sidebar Option 1")
elif sidebar_add_selectbox == "2":
    st.write("Sidebar Option 2")
elif sidebar_add_selectbox == "3":
    st.write("Sidebar Option 3")

# PROGRESS BAR

my_bar = st.progress(0)
number_of_loops = 10
for loop in range(number_of_loops+1):
    time.sleep(1)
    my_bar.progress(loop/number_of_loops)

# CACHE 

# note: use for data downloading, data transformations, calculations,  etc. 

# cache functions
@st.cache
def function_to_cache(a, b):
    time.sleep(10)
    return a*b

# first run
start_time = time.time()
result = function_to_cache(32, 43)
end_time = time.time()
st.write(result)
st.write(end_time - start_time)

# cached result 
start_time = time.time()
result = function_to_cache(32, 43)
end_time = time.time()
st.write(result)
st.write(end_time - start_time)
