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
  , field      : String
  , uid        : Int
  }

type Schnippet = 
  { date        : String
  , description : String
  , id          : Int
  }

newSchnippet : String -> Int -> Schnippet
newSchnippet txt id =
  { description = Debug.watch "A new schnippet" txt
  , date = ""
  , id = id
  }

emptyState : State
emptyState =
  { schnippets = []
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

step : Action -> State -> State
step action state =
    case Debug.watch "Current action" action of
      NoOp -> state

      Add ->
          { state | uid <- Debug.watch "Schnippet ID" (state.uid + 1)
                  , field <- ""
                  , schnippets <- if String.isEmpty state.field
                                  then state.schnippets
                                  else state.schnippets ++ [newSchnippet state.field state.uid]
          }

      UpdateField str ->
          { state | field <- str }
            
--- View ---

view : State -> Html
view state =
    div
      [
        class "someclass"
      ]
      [ section
        [ id "schnippetsapp" ]
        [ Ref.lazy schnippetEntry state.field
        , Ref.lazy schnippetList state.schnippets
        ]
      , infoFooter
      ]

onEnter : Input.Handle a -> a -> Attribute
onEnter handle value =
    on "keydown" (when (\k -> k.keyCode == 13) getKeyboardEvent) handle (always value)

schnippetEntry : String -> Html
schnippetEntry schnippet =
    header
       [ id "header" ]
       [ h1 [] [ text "Schnippets" ]
       , input
         [ id "new-schnippet"
         , placeholder "What did you do today?"
         , autofocus True
         , value schnippet
         , name "newSchnippet"
         , on "input" getValue actions.handle UpdateField
         , onEnter actions.handle Add
         ]
         []
       ]

schnippetList : [Schnippet] -> Html
schnippetList schnippets =
    section
      [ id "main" ]
      [ ul
        [ id "schnippet-list" ]
        (map schnippetItem schnippets)
      ]

schnippetItem : Schnippet -> Html
schnippetItem schnippet =
    li
      []
      [ div
        [ class "view" ]
        [ span [] [ text schnippet.description ] ]
      ]

infoFooter : Html
infoFooter =
    footer [ id "info" ]
      [ p [] [ text "Enter a schnippet" ]
      , p [] [ text "Written by "
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
