module Schnippets where
{-| Schnippets : a totally simple app based on Google Snippets, 
    which may have in turn inspired tools like iDoneThis.

    This app is structured like other bigger Elm apps:
    - model
    - update
    - view
    - inputs
-}

import Debug
import Graphics.Input as Input
import Html
import Html (..)
import Html.Attributes (..)
import Html.Events (..)
import Html.Tags (..)
import Html.Optimize.RefEq as Ref
import String
import Window

---- Model ----

type State =
  { schnippets : [Schnippet]
  , dateField  : String
  , field      : String
  , uid        : Int
  }

type Schnippet = 
  { date        : String
  , description : String
  , id          : Int
  }

newSchnippet : String -> String -> Int -> Schnippet
newSchnippet dte txt id =
  { description = Debug.watch "A new schnippet" txt
  , date = dte
  , id = id
  }

emptyState : State
emptyState =
  { schnippets = []
  , dateField = ""
  , field = ""
  , uid = 0
  }

--- Update ---

-- What kinds of actions can be performed on the state of the application.

data Action
  = NoOp
  | Add
  | Delete Int
  | UpdateField String
  | UpdateDate String

step : Action -> State -> State
step action state =
    case Debug.watch "Current action" action of
      NoOp -> state

      Add ->
          { state | uid <- Debug.watch "Schnippet ID" (state.uid + 1)
                  , dateField <- ""
                  , field <- ""
                  , schnippets <- if String.isEmpty state.field
                                  then state.schnippets
                                  else state.schnippets ++ [newSchnippet state.dateField state.field state.uid]
          }

      UpdateField str ->
          { state | field <- str }
            
      UpdateDate str ->
          { state | dateField <- str }

      Delete id ->
          { state | schnippets <- filter (\t -> t.id /= id) state.schnippets }
            
--- View ---

view : State -> Html
view state =
    div
      [
        class "someclass"
      ]
      [ section
        [ id "schnippetsapp" ]
        [ Ref.lazy2 schnippetEntry state.dateField state.field
        , Ref.lazy schnippetList state.schnippets
        ]
      , infoFooter
      ]

textStyle : [CssProperty]
textStyle = [
         prop "height" "200px",
         prop "width" "450px"
      ]

deleteButton : [CssProperty]
deleteButton = [
         prop "float" "right"
      ]

topPad : [CssProperty]
topPad = [
         prop "margin-top" "1em"
      ]

wordbreak : [CssProperty]
wordbreak = [
         prop "word-break" "break-word"
      ]

bold : [CssProperty]
bold = [
          prop "font-weight" "bold"
      ]

onEnter : Input.Handle a -> a -> Attribute
onEnter handle value =
    on "keydown" (when (\k -> k.keyCode == 13) getKeyboardEvent) handle (always value)

schnippetEntry : String -> String -> Html
schnippetEntry schnippetDate schnippetValue =
    header
       [ id "header" ]
       [ h1 [] [ text "Schnippets" ]
       , p [] [ text "Enter a schnippet:" ]
       , input
         [ id "new-date"
         , required True
         , placeholder "Enter date"
         , name "newDate"
         , value schnippetDate
         , on "input" getValue actions.handle UpdateDate
         ]
         []
       , br [] []
       , input
         [ id "new-schnippet"
         , placeholder "What did you do today?"
         , autofocus True
         , required True
         , value schnippetValue
         , name "newSchnippet"
         , on "input" getValue actions.handle UpdateField
         , onEnter actions.handle Add
         , style (textStyle ++ topPad ++ wordbreak)
         ]
         []
       , br [] []
       , button 
         [ id "save-schnippet"
         , onclick actions.handle (always (Add))
         , style (topPad) ] 
         [ text "Save" ]
       ]

schnippetList : [Schnippet] -> Html
schnippetList schnippets =
    section
      [ id "main" ]
      [ p [] [ text "Previous schnippets:"]
      , dl
        [ id "schnippet-list" ]
        (map schnippetItem schnippets)
      ]

schnippetItem : Schnippet -> Html
schnippetItem schnippet =
    span
      [ ]
      [ dt
          [ style (bold)  ]
          [ text schnippet.date
          , button
            [ class "delete-button"
            , style (deleteButton)
            , onclick actions.handle (always (Delete schnippet.id))
            ]
            [ text "Delete" ]
          ]
      , dd
          []
          [ div
            [ class "view" ]
            [ span [] [ text schnippet.description ] ]
          ] ]

infoFooter : Html
infoFooter =
    footer [ id "info" ]
      [ p [] [ text "Written by "
             , a [ href "https://erewhon.flatland.org/" ] [ text "Steven Byrnes" ]
             ]
      ]

-- Inputs --

main : Signal Element
main = lift2 scene state Window.dimensions

scene : State -> (Int,Int) -> Element
scene state (w,h) =
  container w h midTop (Html.toElement 550 h (view state))

-- manage state of app over time
state : Signal State
state = foldp step startingState actions.signal

startingState : State
startingState = emptyState

-- actions from user input
actions : Input.Input Action
actions = Input.input NoOp
